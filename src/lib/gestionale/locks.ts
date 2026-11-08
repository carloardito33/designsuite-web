import { createAdminClient } from "@/lib/supabase/admin";
import { addDays, todayISO } from "./dates";
import { romeDateTime } from "./messages";
import { createTimeLimitKey, deleteKey, listKeypads, randomPasscode, switchbotConfigured } from "./switchbot";

/**
 * Ciclo di vita dei codici SwitchBot:
 *  - creazione 2 giorni prima dell'arrivo (o subito, se l'arrivo è più vicino)
 *  - conferma leggendo la keyList del tastierino (o via webhook)
 *  - cancellazione il giorno dopo la partenza
 */
export type LockResult = { created: number; confirmed: number; deleted: number; failed: number; errors: string[] };

const CREATE_DAYS_BEFORE = 2;
const PENDING_RETRY_MINUTES = 30;
const MAX_ATTEMPTS = 3;

function hourOf(t: string | null | undefined, fallback: number): number {
  const m = (t ?? "").match(/^(\d{1,2})/);
  return m ? Number(m[1]) : fallback;
}

export async function processLocks(): Promise<LockResult> {
  const r: LockResult = { created: 0, confirmed: 0, deleted: 0, failed: 0, errors: [] };
  if (!switchbotConfigured()) return r;

  const db = createAdminClient();
  const today = todayISO();

  const { data: props } = await db.from("properties").select("id, name, access_type, switchbot_device_id, checkin_time, checkout_time").eq("access_type", "switchbot").not("switchbot_device_id", "is", null);
  const byProp = new Map((props ?? []).map((p) => [p.id, p]));
  if (!byProp.size) return r;

  const { data: bookings } = await db
    .from("bookings")
    .select("id, property_id, check_in, check_out, status, is_block, source, access_code, access_code_status, access_code_attempts, switchbot_key_name, switchbot_key_id, access_code_requested_at, guest_name")
    .in("property_id", [...byProp.keys()])
    .eq("is_block", false)
    .neq("source", "block")
    .gte("check_out", addDays(today, -2))
    .lte("check_in", addDays(today, CREATE_DAYS_BEFORE));

  const rows = bookings ?? [];
  const needsDeviceList = rows.some((b) => b.access_code_status === "pending" || (b.access_code_status === "active" && !b.switchbot_key_id));
  let keypads: Awaited<ReturnType<typeof listKeypads>> = [];
  if (needsDeviceList) {
    try {
      keypads = await listKeypads();
    } catch (err) {
      r.errors.push(`Elenco dispositivi: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  for (const b of rows) {
    const p = byProp.get(b.property_id)!;
    const deviceId = p.switchbot_device_id as string;
    const keypad = keypads.find((k) => k.deviceId === deviceId);
    const now = Date.now();

    try {
      // 1) Cancellazione dopo la partenza (o se cancellata)
      if ((b.status === "cancelled" || b.check_out < today) && b.access_code_status === "active") {
        if (b.switchbot_key_id) await deleteKey(deviceId, b.switchbot_key_id);
        await db.from("bookings").update({ access_code_status: "deleted" }).eq("id", b.id);
        r.deleted++;
        continue;
      }
      if (b.status !== "confirmed" || b.check_out < today) continue;

      // 2) Conferma di un codice in attesa
      if (b.access_code_status === "pending" || (b.access_code_status === "active" && !b.switchbot_key_id)) {
        const key = keypad?.keyList?.find((k) => k.name === b.switchbot_key_name);
        if (key) {
          await db.from("bookings").update({ access_code_status: "active", switchbot_key_id: key.id }).eq("id", b.id);
          if (b.access_code_status === "pending") r.confirmed++;
          continue;
        }
        if (b.access_code_status === "active") continue; // confermato via webhook, id non ancora visibile
        const ageMin = b.access_code_requested_at ? (now - new Date(b.access_code_requested_at).getTime()) / 60000 : 0;
        if (ageMin < PENDING_RETRY_MINUTES) continue;
        if ((b.access_code_attempts ?? 0) >= MAX_ATTEMPTS) {
          await db.from("bookings").update({ access_code_status: "failed" }).eq("id", b.id);
          await db.from("notifications").insert({
            type: "lock_error",
            property_id: b.property_id,
            booking_id: b.id,
            title: `Codice serratura non creato: ${p.name}`,
            body: `Dopo ${MAX_ATTEMPTS} tentativi il tastierino non ha confermato il codice. Controlla hub e tastierino, poi "Rigenera codice" dalla prenotazione.`,
          });
          r.failed++;
          continue;
        }
        // Nuovo tentativo con un nome diverso (i nomi devono essere unici sul dispositivo).
      }

      // 3) Creazione (prima volta o nuovo tentativo)
      if (b.access_code_status === "none" || b.access_code_status === "pending") {
        const code = b.access_code ?? randomPasscode();
        const attempt = (b.access_code_attempts ?? 0) + 1;
        const name = `DS ${b.check_in.slice(5)} ${b.id.slice(0, 4)}${attempt > 1 ? ` r${attempt}` : ""}`;
        const start = romeDateTime(b.check_in, Math.max(0, hourOf(p.checkin_time, 16) - 2));
        const end = romeDateTime(b.check_out, Math.min(23, hourOf(p.checkout_time, 10) + 2));
        const commandId = await createTimeLimitKey(deviceId, { name, password: code, start, end });
        await db
          .from("bookings")
          .update({
            access_code: code,
            access_code_status: "pending",
            access_code_attempts: attempt,
            access_code_requested_at: new Date().toISOString(),
            switchbot_key_name: name,
            switchbot_command_id: commandId,
            switchbot_key_id: null,
          })
          .eq("id", b.id);
        r.created++;
      }
    } catch (err) {
      r.errors.push(`${p.name} ${b.check_in}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return r;
}

/** Forza la creazione di un nuovo codice per una prenotazione (dalla scheda). */
export async function regenerateCode(bookingId: string) {
  const db = createAdminClient();
  const { data: b } = await db.from("bookings").select("id, switchbot_key_id, property_id, access_code_status").eq("id", bookingId).maybeSingle();
  if (!b) return;
  if (b.switchbot_key_id) {
    const { data: p } = await db.from("properties").select("switchbot_device_id").eq("id", b.property_id).maybeSingle();
    if (p?.switchbot_device_id) await deleteKey(p.switchbot_device_id, b.switchbot_key_id).catch(() => undefined);
  }
  await db
    .from("bookings")
    .update({ access_code: null, access_code_status: "none", access_code_attempts: 0, switchbot_key_id: null, switchbot_key_name: null, switchbot_command_id: null })
    .eq("id", bookingId);
  await processLocks();
}

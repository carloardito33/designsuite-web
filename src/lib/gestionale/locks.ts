import { createAdminClient } from "@/lib/supabase/admin";
import { addDays, todayISO } from "./dates";
import { romeDateTime } from "./messages";
import { createTimeLimitKey, deleteKey, listKeypads, passcodeFromPhone, randomPasscode, switchbotConfigured } from "./switchbot";

/**
 * Ciclo di vita dei codici SwitchBot:
 *  - creazione 2 giorni prima dell'arrivo (o subito, se l'arrivo è più vicino)
 *  - conferma leggendo la keyList del tastierino (o via webhook)
 *  - cancellazione il giorno dopo la partenza
 */
export type LockResult = { created: number; confirmed: number; deleted: number; failed: number; errors: string[] };

const CREATE_DAYS_BEFORE = 2;
/** Il codice vale dalle 11 del giorno di arrivo alle 16 del giorno di partenza (ora di Roma). */
const CODE_START_HOUR = 11;
const CODE_END_HOUR = 16;

/** Nome del codice come appare nell'app SwitchBot: "Carlo 11-22" (nome ospite + data di arrivo). */
function keyName(b: { id: string; check_in: string; guest_name?: string | null }, attempt: number): string {
  const first = (b.guest_name ?? "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)[0] ?? "";
  const who = first ? first.slice(0, 12) : `DS${b.id.slice(0, 4)}`;
  return `${who} ${b.check_in.slice(5)}${attempt > 1 ? ` r${attempt}` : ""}`;
}
const PENDING_RETRY_MINUTES = 30;
const MAX_ATTEMPTS = 3;

export async function processLocks(): Promise<LockResult> {
  const r: LockResult = { created: 0, confirmed: 0, deleted: 0, failed: 0, errors: [] };
  if (!switchbotConfigured()) return r;

  const db = createAdminClient();
  const today = todayISO();

  const { data: props } = await db.from("properties").select("id, name, access_type, switchbot_device_id").eq("access_type", "switchbot").not("switchbot_device_id", "is", null);
  const byProp = new Map((props ?? []).map((p) => [p.id, p]));
  if (!byProp.size) return r;

  const { data: bookings } = await db
    .from("bookings")
    .select("id, property_id, check_in, check_out, status, is_block, source, access_code, access_code_status, access_code_attempts, switchbot_key_name, switchbot_key_id, access_code_requested_at, guest_name, guest_phone")
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
        await createCode(db, b, p);
        r.created++;
      }
    } catch (err) {
      r.errors.push(`${p.name} ${b.check_in}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return r;
}

type CodeBooking = { id: string; check_in: string; check_out: string; access_code: string | null; access_code_attempts: number | null; guest_name?: string | null; guest_phone?: string | null };
type CodeProperty = { switchbot_device_id: string | null };

async function createCode(db: ReturnType<typeof createAdminClient>, b: CodeBooking, p: CodeProperty) {
  const deviceId = p.switchbot_device_id as string;
  // Codice = telefono dell'ospite senza prefisso; se manca, un numero casuale.
  const code = b.access_code ?? passcodeFromPhone(b.guest_phone) ?? randomPasscode();
  const attempt = (b.access_code_attempts ?? 0) + 1;
  const name = keyName(b, attempt);
  const start = romeDateTime(b.check_in, CODE_START_HOUR);
  const end = romeDateTime(b.check_out, CODE_END_HOUR);
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
  return code;
}

/**
 * Crea subito un codice per una prenotazione (dalla scheda), a qualsiasi distanza dall'arrivo.
 * Se esiste già un codice sul tastierino lo cancella e ne crea uno nuovo.
 * Ritorna un messaggio di errore leggibile, oppure null se è andata bene.
 */
export async function regenerateCode(bookingId: string): Promise<string | null> {
  if (!switchbotConfigured()) return "SwitchBot non configurato su Vercel (SWITCHBOT_TOKEN e SWITCHBOT_SECRET).";
  const db = createAdminClient();
  const { data: b } = await db
    .from("bookings")
    .select("id, property_id, check_in, check_out, status, is_block, source, access_code, access_code_status, access_code_attempts, switchbot_key_id, guest_name, guest_phone")
    .eq("id", bookingId)
    .maybeSingle();
  if (!b) return "Prenotazione non trovata.";
  if (b.is_block || b.source === "block") return "Le date chiuse non hanno codice serratura.";
  if (b.status === "cancelled") return "La prenotazione è cancellata.";
  if (b.check_out < todayISO()) return "La prenotazione è già terminata.";

  const { data: p } = await db.from("properties").select("name, access_type, switchbot_device_id").eq("id", b.property_id).maybeSingle();
  if (!p) return "Casa non trovata.";
  if (p.access_type !== "switchbot") return `${p.name}: l'accesso non è impostato su "Serratura SwitchBot" nella pagina Case.`;
  if (!p.switchbot_device_id) return `${p.name}: nessun tastierino abbinato. Scegli il tastierino nella pagina Case e salva.`;

  if (b.switchbot_key_id) await deleteKey(p.switchbot_device_id, b.switchbot_key_id).catch(() => undefined);
  try {
    await createCode(db, { ...b, access_code: null, access_code_attempts: 0 }, p);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await db.from("bookings").update({ access_code_status: "failed", access_code_requested_at: new Date().toISOString() }).eq("id", bookingId);
    return `Il tastierino non ha accettato il comando: ${msg}`;
  }
  // Prova a confermare subito leggendo la lista codici del tastierino.
  try {
    const keypads = await listKeypads();
    const kp = keypads.find((k) => k.deviceId === p.switchbot_device_id);
    const { data: fresh } = await db.from("bookings").select("switchbot_key_name").eq("id", bookingId).maybeSingle();
    const key = kp?.keyList?.find((k) => k.name === fresh?.switchbot_key_name);
    if (key) await db.from("bookings").update({ access_code_status: "active", switchbot_key_id: key.id }).eq("id", bookingId);
  } catch {
    // la conferma arriverà dal webhook o dalla prossima sincronizzazione
  }
  return null;
}

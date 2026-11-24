import { createAdminClient } from "@/lib/supabase/admin";
import { addDays, todayISO } from "./dates";
import { romeDateTime } from "./messages";
import { createTimeLimitKey, deleteKey, listKeypads, passcodeFromPhone, randomPasscode, switchbotConfigured } from "./switchbot";

/**
 * Ciclo di vita dei codici SwitchBot:
 *  - creazione 2 giorni prima dell'arrivo (o subito, se l'arrivo è più vicino)
 *  - conferma leggendo la keyList del tastierino (o via webhook)
 *  - cancellazione alle 16 del giorno di partenza (o appena la prenotazione viene cancellata)
 *  - a ogni passaggio, eliminazione di tutti i codici che il tastierino segna come scaduti,
 *    anche quelli creati a mano dall'app SwitchBot
 */
export type LockResult = { created: number; confirmed: number; deleted: number; expired: number; failed: number; errors: string[] };

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

/** Ora corrente a Roma (0-23). */
function romeHour(): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", hour12: false }).format(new Date()));
}

export async function processLocks(): Promise<LockResult> {
  const r: LockResult = { created: 0, confirmed: 0, deleted: 0, expired: 0, failed: 0, errors: [] };
  if (!switchbotConfigured()) return r;

  const db = createAdminClient();
  const today = todayISO();

  const { data: props } = await db.from("properties").select("id, name, access_type, switchbot_device_id").eq("access_type", "switchbot").not("switchbot_device_id", "is", null);
  const byProp = new Map((props ?? []).map((p) => [p.id, p]));
  if (!byProp.size) return r;

  const SELECT = "id, property_id, check_in, check_out, status, is_block, source, access_code, access_code_status, access_code_attempts, switchbot_key_name, switchbot_key_id, access_code_requested_at, guest_name, guest_phone";
  const [{ data: bookings }, { data: expiring }] = await Promise.all([
    db
      .from("bookings")
      .select(SELECT)
      .in("property_id", [...byProp.keys()])
      .eq("is_block", false)
      .neq("source", "block")
      .gte("check_out", today)
      .lte("check_in", addDays(today, CREATE_DAYS_BEFORE)),
    // Codici da togliere dal tastierino: prenotazioni finite o cancellate con un codice ancora presente,
    // senza limiti di data (così si recupera anche quello che fosse sfuggito nei giorni precedenti).
    db
      .from("bookings")
      .select(SELECT)
      .in("property_id", [...byProp.keys()])
      .in("access_code_status", ["pending", "active", "failed"])
      .or(`check_out.lte.${today},status.eq.cancelled`),
  ]);

  const rows = bookings ?? [];
  const toDelete = (expiring ?? []).filter((b) => b.status === "cancelled" || b.check_out < today || (b.check_out === today && romeHour() >= CODE_END_HOUR));
  let keypads: Awaited<ReturnType<typeof listKeypads>> = [];
  try {
    keypads = await listKeypads();
  } catch (err) {
    r.errors.push(`Elenco dispositivi: ${err instanceof Error ? err.message : String(err)}`);
  }

  // 0) Pulizia dei codici scaduti sul tastierino, compresi quelli inseriti a mano dall'app SwitchBot.
  for (const p of byProp.values()) {
    const keypad = keypads.find((k) => k.deviceId === p.switchbot_device_id);
    if (!keypad) continue;
    try {
      r.expired += await deleteExpiredKeys(keypad);
    } catch (err) {
      r.errors.push(`${p.name}: pulizia codici scaduti: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // 1) Cancellazione dopo la scadenza (16:00 del giorno di partenza) o se la prenotazione è cancellata
  for (const b of toDelete) {
    const p = byProp.get(b.property_id)!;
    const deviceId = p.switchbot_device_id as string;
    const keypad = keypads.find((k) => k.deviceId === deviceId);
    try {
      // Si cercano sul tastierino tutte le chiavi di questa prenotazione: per id e per nome
      // (compresi i tentativi precedenti, che hanno lo stesso nome con suffisso " rN").
      const base = (b.switchbot_key_name ?? "").replace(/ r\d+$/, "");
      const ids = new Set<number>();
      if (b.switchbot_key_id) ids.add(b.switchbot_key_id);
      for (const k of keypad?.keyList ?? []) {
        if (base && (k.name === base || k.name.startsWith(`${base} r`))) ids.add(k.id);
      }
      if (ids.size === 0 && !keypad) {
        // tastierino non raggiungibile: si riprova alla prossima sincronizzazione
        r.errors.push(`${p.name} ${b.check_in}: tastierino non raggiungibile, codice non ancora cancellato`);
        continue;
      }
      for (const id of ids) await deleteKey(deviceId, id);
      await db.from("bookings").update({ access_code_status: "deleted" }).eq("id", b.id);
      r.deleted++;
    } catch (err) {
      r.errors.push(`${p.name} ${b.check_in}: cancellazione codice: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  for (const b of rows) {
    const p = byProp.get(b.property_id)!;
    const deviceId = p.switchbot_device_id as string;
    const keypad = keypads.find((k) => k.deviceId === deviceId);
    const now = Date.now();

    try {
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

/** Elimina dal tastierino tutti i codici che risultano scaduti (anche quelli creati a mano). Ritorna quanti ne ha tolti. */
export async function deleteExpiredKeys(keypad: { deviceId: string; keyList?: { id: number; name: string; type: string; status: string }[] }): Promise<number> {
  const expired = (keypad.keyList ?? []).filter((k) => k.status === "expired" && k.type !== "permanent");
  for (const k of expired) await deleteKey(keypad.deviceId, k.id);
  return expired.length;
}

/** Pulizia manuale dalla pagina Impostazioni: tutti i tastierini abbinati alle case. */
export async function cleanupExpiredKeys(): Promise<{ removed: number; errors: string[] }> {
  const out = { removed: 0, errors: [] as string[] };
  if (!switchbotConfigured()) return out;
  const keypads = await listKeypads();
  for (const k of keypads) {
    try {
      out.removed += await deleteExpiredKeys(k);
    } catch (err) {
      out.errors.push(`${k.deviceName}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return out;
}

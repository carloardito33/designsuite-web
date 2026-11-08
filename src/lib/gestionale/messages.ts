import { createAdminClient } from "@/lib/supabase/admin";
import { addDays, diffDays, formatDateIT, parseISODate, todayISO } from "./dates";
import { sendEmail } from "./notify";
import type { BookingRow, PropertyRow } from "./types";

export const SITE_URL = "https://www.designsuite.it";

export type TemplateRow = {
  id: string;
  key: string;
  name: string;
  trigger: "on_booking" | "before_arrival" | "on_arrival" | "before_departure" | "after_departure" | "on_checkin_completed" | "manual";
  days_offset: number;
  send_hour: number;
  channels: string[];
  property_ids: string[] | null;
  only_if_contact: boolean;
  active: boolean;
  subject_it: string;
  subject_en: string;
  body_it: string;
  body_en: string;
  sort_order: number;
};

export type MessageLogRow = {
  id: string;
  booking_id: string;
  template_id: string | null;
  template_key: string | null;
  due_at: string;
  status: "scheduled" | "sent" | "manual" | "done" | "skipped" | "error";
  channel: string | null;
  to_email: string | null;
  subject: string | null;
  body: string | null;
  sent_at: string | null;
  error: string | null;
  created_at: string;
};

type PropertyFull = PropertyRow & {
  address?: string | null;
  city?: string | null;
  checkin_time?: string;
  checkout_time?: string;
  wifi_ssid?: string | null;
  wifi_password?: string | null;
  access_type?: string;
  lockbox_code?: string | null;
  google_review_url?: string | null;
  host_phone?: string | null;
  host_email?: string | null;
};

type BookingFull = BookingRow & {
  guest_lang?: "it" | "en";
  checkin_token?: string | null;
  arrival_time?: string | null;
  access_code?: string | null;
  access_code_status?: string;
};

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDateEN(s: string): string {
  const d = parseISODate(s);
  return `${MONTHS_EN[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Valori delle variabili per una prenotazione. */
export function templateVariables(b: BookingFull, p: PropertyFull, lang: "it" | "en"): Record<string, string> {
  const fmt = lang === "it" ? (s: string) => formatDateIT(s, { weekday: true, year: true }) : formatDateEN;
  const token = b.checkin_token ?? "";
  const accessCode =
    p.access_type === "switchbot"
      ? (b.access_code && b.access_code_status !== "none" && b.access_code_status !== "failed" ? b.access_code : null) ??
        (lang === "it" ? "(ti arriverà il giorno prima dell'arrivo)" : "(you will receive it the day before arrival)")
      : p.access_type === "lockbox"
        ? p.lockbox_code ?? ""
        : "";
  return {
    guest_name: b.guest_name?.trim() || (lang === "it" ? "ospite" : "there"),
    property: p.name,
    check_in: fmt(b.check_in),
    check_out: fmt(b.check_out),
    nights: String(diffDays(b.check_in, b.check_out)),
    guests: String(b.guests ?? ""),
    checkin_link: `${SITE_URL}/checkin/${token}`,
    guide_link: `${SITE_URL}/ospiti/${token}`,
    access_code: accessCode,
    lockbox_code: p.lockbox_code ?? "",
    arrival_time: b.arrival_time ?? p.checkin_time ?? "16:00",
    address: [p.address, p.city].filter(Boolean).join(", "),
    wifi_ssid: p.wifi_ssid ?? "",
    wifi_password: p.wifi_password ?? "",
    review_link: p.google_review_url ?? "",
    host_phone: p.host_phone ?? "+39 335 6810310",
    host_email: p.host_email ?? "carlo@designsuite.it",
  };
}

export function renderTemplate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) => (k in vars ? vars[k] : `{{${k}}}`));
}

export function renderMessage(t: TemplateRow, b: BookingFull, p: PropertyFull) {
  const lang = b.guest_lang === "it" ? "it" : "en";
  const vars = templateVariables(b, p, lang);
  return {
    subject: renderTemplate(lang === "it" ? t.subject_it : t.subject_en, vars),
    body: renderTemplate(lang === "it" ? t.body_it : t.body_en, vars),
  };
}

/** Istante (UTC) corrispondente a una data e ora in Italia. */
export function romeDateTime(dateISO: string, hour: number): Date {
  const guess = new Date(`${dateISO}T${String(hour).padStart(2, "0")}:00:00Z`);
  // Scostamento di Roma in quel momento (60 o 120 minuti).
  const romeStr = guess.toLocaleString("en-US", { timeZone: "Europe/Rome", hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const m = romeStr.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/);
  if (!m) return guess;
  const asIfUtc = Date.UTC(Number(m[3]), Number(m[1]) - 1, Number(m[2]), Number(m[4]) % 24, Number(m[5]));
  const offsetMin = (asIfUtc - guess.getTime()) / 60000;
  return new Date(guess.getTime() - offsetMin * 60000);
}

function dueFor(t: TemplateRow, b: BookingFull, nowMs: number): Date | null {
  const today = todayISO();
  switch (t.trigger) {
    case "on_booking":
      return new Date(nowMs);
    case "before_arrival": {
      if (b.check_in < today) return null; // arrivo già passato
      const d = romeDateTime(addDays(b.check_in, -t.days_offset), t.send_hour);
      return d.getTime() < nowMs ? new Date(nowMs) : d;
    }
    case "on_arrival": {
      if (b.check_in < today) return null;
      const d = romeDateTime(b.check_in, t.send_hour);
      return d.getTime() < nowMs ? new Date(nowMs) : d;
    }
    case "before_departure": {
      if (b.check_out <= today) return null;
      const d = romeDateTime(addDays(b.check_out, -t.days_offset), t.send_hour);
      return d.getTime() < nowMs ? new Date(nowMs) : d;
    }
    case "after_departure": {
      if (b.check_out < addDays(today, -t.days_offset - 1)) return null;
      return romeDateTime(addDays(b.check_out, t.days_offset), t.send_hour);
    }
    default:
      return null; // manual, on_checkin_completed: creati su azione
  }
}

function templateApplies(t: TemplateRow, b: BookingFull): boolean {
  if (!t.active) return false;
  if (!t.channels.includes(b.source)) return false;
  if (t.property_ids && t.property_ids.length && !t.property_ids.includes(b.property_id)) return false;
  return true;
}

/**
 * Pianifica i messaggi automatici per le prenotazioni attive dei prossimi 60 giorni.
 * Idempotente: una riga per prenotazione e modello.
 */
export async function scheduleMessages(): Promise<{ created: number }> {
  const db = createAdminClient();
  const today = todayISO();
  const nowMs = Date.now();

  const [{ data: templates }, { data: bookings }, { data: properties }] = await Promise.all([
    db.from("message_templates").select("*").eq("active", true).in("trigger", ["on_booking", "before_arrival", "on_arrival", "before_departure", "after_departure"]),
    db
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .eq("is_block", false)
      .neq("source", "block")
      .gte("check_out", today)
      .lte("check_in", addDays(today, 60)),
    db.from("properties").select("*"),
  ]);

  const props = new Map((properties ?? []).map((p) => [p.id, p as PropertyFull]));
  let created = 0;

  for (const b of (bookings ?? []) as BookingFull[]) {
    const p = props.get(b.property_id);
    if (!p) continue;
    // Le conferme "alla prenotazione" valgono solo per prenotazioni nuove (ultime 48 ore).
    const isNew = nowMs - new Date(b.created_at).getTime() < 48 * 3600 * 1000;
    const { data: existing } = await db.from("message_log").select("template_key").eq("booking_id", b.id);
    const have = new Set((existing ?? []).map((r) => r.template_key));

    for (const t of (templates ?? []) as TemplateRow[]) {
      if (have.has(t.key) || !templateApplies(t, b)) continue;
      if (t.trigger === "on_booking" && !isNew) continue;
      const due = dueFor(t, b, nowMs);
      if (!due) continue;
      const { subject, body } = renderMessage(t, b, p);
      const { error } = await db.from("message_log").insert({
        booking_id: b.id,
        template_id: t.id,
        template_key: t.key,
        due_at: due.toISOString(),
        status: "scheduled",
        subject,
        body,
      });
      if (!error) created++;
    }
  }
  return { created };
}

/** Crea subito un messaggio per una prenotazione (es. dopo il check in o invio manuale). */
export async function enqueueMessage(templateKey: string, bookingId: string, opts: { force?: boolean } = {}) {
  const db = createAdminClient();
  const [{ data: t }, { data: b }] = await Promise.all([
    db.from("message_templates").select("*").eq("key", templateKey).maybeSingle(),
    db.from("bookings").select("*").eq("id", bookingId).maybeSingle(),
  ]);
  if (!t || !b) return { error: "Modello o prenotazione non trovati" };
  const { data: p } = await db.from("properties").select("*").eq("id", b.property_id).maybeSingle();
  if (!p) return { error: "Casa non trovata" };
  if (!opts.force && !templateApplies(t as TemplateRow, b as BookingFull)) return { error: "Il modello non si applica a questa prenotazione" };
  const { subject, body } = renderMessage(t as TemplateRow, b as BookingFull, p as PropertyFull);
  // Se esiste già, lo riprogramma.
  const { error } = await db.from("message_log").upsert(
    { booking_id: b.id, template_id: t.id, template_key: t.key, due_at: new Date().toISOString(), status: "scheduled", subject, body, error: null, sent_at: null },
    { onConflict: "booking_id,template_key" },
  );
  return { error: error?.message };
}

/**
 * Invia i messaggi scaduti: email se c'è un indirizzo, altrimenti li mette in coda manuale
 * (testo pronto da incollare nella chat del portale).
 */
export async function dispatchMessages(): Promise<{ sent: number; manual: number; errors: number }> {
  const db = createAdminClient();
  const now = new Date().toISOString();
  const { data: due } = await db
    .from("message_log")
    .select("*, bookings!inner(*), message_templates(*)")
    .eq("status", "scheduled")
    .lte("due_at", now)
    .limit(50);

  let sent = 0, manual = 0, errors = 0;
  for (const row of (due ?? []) as (MessageLogRow & { bookings: BookingFull; message_templates: TemplateRow | null })[]) {
    if (row.bookings.status === "cancelled") {
      await db.from("message_log").update({ status: "skipped" }).eq("id", row.id);
      continue;
    }
    // Il testo viene composto al momento dell'invio, così contiene i dati più recenti
    // (codice serratura, contatti raccolti dal check in, lingua scelta dall'ospite).
    if (row.message_templates) {
      const { data: p } = await db.from("properties").select("*").eq("id", row.bookings.property_id).maybeSingle();
      if (p) {
        const r = renderMessage(row.message_templates, row.bookings, p as PropertyFull);
        row.subject = r.subject;
        row.body = r.body;
        await db.from("message_log").update({ subject: r.subject, body: r.body }).eq("id", row.id);
      }
    }
    const email = row.bookings.guest_email?.trim();
    if (!email) {
      if (row.message_templates?.only_if_contact) {
        await db.from("message_log").update({ status: "skipped", error: "Nessuna email" }).eq("id", row.id);
      } else {
        await db.from("message_log").update({ status: "manual", channel: "manual" }).eq("id", row.id);
        manual++;
      }
      continue;
    }
    const { data: hp } = await db.from("properties").select("host_email").eq("id", row.bookings.property_id).maybeSingle();
    const r = await sendEmail({ to: email, subject: row.subject ?? "", text: row.body ?? "", replyTo: hp?.host_email ?? "carlo@designsuite.it" });
    if (r.ok) {
      await db.from("message_log").update({ status: "sent", channel: "email", to_email: email, sent_at: new Date().toISOString() }).eq("id", row.id);
      sent++;
    } else {
      // Senza Resend configurato il messaggio finisce in coda manuale invece di restare bloccato.
      const toManual = r.error.includes("RESEND_API_KEY");
      await db.from("message_log").update(toManual ? { status: "manual", channel: "manual", error: r.error } : { status: "error", error: r.error }).eq("id", row.id);
      if (toManual) manual++; else errors++;
    }
  }
  return { sent, manual, errors };
}

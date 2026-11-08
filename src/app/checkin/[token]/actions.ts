"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { computeTouristTax, getBookingByToken } from "@/lib/gestionale/checkin";
import { dispatchMessages, enqueueMessage } from "@/lib/gestionale/messages";
import { formatDateIT } from "@/lib/gestionale/dates";

export type CheckinState = { ok?: boolean; error?: string; tax?: number } | undefined;

function s(fd: FormData, k: string): string | null {
  const v = fd.get(k);
  if (v === null || typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

export async function submitCheckin(token: string, _prev: CheckinState, fd: FormData): Promise<CheckinState> {
  const lang = s(fd, "lang") === "it" ? "it" : "en";
  const err = (it: string, en: string) => ({ error: lang === "it" ? it : en });

  const booking = await getBookingByToken(token);
  if (!booking || booking.status === "cancelled") return err("Prenotazione non trovata", "Booking not found");

  const count = Math.min(Math.max(Number(s(fd, "guest_count") ?? 1), 1), 12);
  const email = s(fd, "email");
  const phone = s(fd, "phone");
  if (!email || !phone) return err("Email e telefono sono obbligatori", "Email and phone are required");
  if (fd.get("consent") !== "1") return err("Serve il consenso al trattamento dei dati", "Consent to data processing is required");

  const guests: Record<string, unknown>[] = [];
  const birthDates: (string | null)[] = [];
  for (let i = 0; i < count; i++) {
    const g = (k: string) => s(fd, `g${i}_${k}`);
    const first = g("first_name"), last = g("last_name"), birth = g("birth_date");
    if (!first || !last || !birth || !g("sex") || !g("birth_place") || !g("citizenship")) {
      return err(`Completa tutti i dati dell'ospite ${i + 1}`, `Please complete all details for guest ${i + 1}`);
    }
    if (i === 0 && (!g("doc_type") || !g("doc_number") || !g("doc_issue_place"))) {
      return err("Per il capogruppo servono i dati del documento", "Document details are required for the lead guest");
    }
    birthDates.push(birth);
    guests.push({
      booking_id: booking.id,
      is_leader: i === 0,
      first_name: first,
      last_name: last,
      sex: g("sex"),
      birth_date: birth,
      birth_place: g("birth_place"),
      birth_country: g("birth_country"),
      citizenship: g("citizenship"),
      residence_city: g("residence_city"),
      residence_country: g("residence_country"),
      doc_type: g("doc_type"),
      doc_number: g("doc_number"),
      doc_issue_place: g("doc_issue_place"),
      email: i === 0 ? email : null,
      phone: i === 0 ? phone : null,
    });
  }

  const db = createAdminClient();

  // Foto dei documenti nello storage privato.
  for (let i = 0; i < count; i++) {
    const file = fd.get(`g${i}_doc_photo`);
    if (file instanceof File && file.size > 0) {
      if (file.size > 6 * 1024 * 1024) return err("Foto troppo grande (max 6 MB)", "Photo too large (max 6 MB)");
      const path = `${booking.id}/${i}-${Date.now()}.jpg`;
      const { error } = await db.storage.from("documenti").upload(path, file, { contentType: file.type || "image/jpeg", upsert: true });
      if (error) return err("Caricamento foto non riuscito, riprova", "Photo upload failed, please try again");
      guests[i].doc_photo_path = path;
    } else if (i === 0 && !booking.checkin_status.startsWith("completed")) {
      return err("Carica la foto del documento del capogruppo", "Please upload a photo of the lead guest's document");
    }
  }

  // Sostituisce eventuali dati precedenti (ricompilazione).
  await db.from("booking_guests").delete().eq("booking_id", booking.id);
  const { error: insErr } = await db.from("booking_guests").insert(guests);
  if (insErr) return err("Errore nel salvataggio, riprova", "Saving failed, please try again");

  const tax = computeTouristTax(booking, booking.properties, birthDates);
  const leader = guests[0];
  const now = new Date().toISOString();
  await db
    .from("bookings")
    .update({
      guest_name: booking.guest_name?.trim() ? booking.guest_name : `${leader.first_name} ${leader.last_name}`,
      guest_email: email,
      guest_phone: phone,
      // La lingua scelta nel modulo aggiorna la prenotazione solo se è italiano o se finora non era specificata.
      ...(lang === "it" || booking.guest_lang === "en" || booking.guest_lang === "it" ? { guest_lang: lang } : {}),
      guests: count,
      arrival_time: s(fd, "arrival_time"),
      checkin_status: "completed",
      checkin_completed_at: now,
      tax_amount: tax,
      questura_status: "pending",
    })
    .eq("id", booking.id);

  await db.from("notifications").insert({
    type: "checkin_completed",
    property_id: booking.property_id,
    booking_id: booking.id,
    title: `Check in completato: ${booking.properties.name}`,
    body: `${leader.first_name} ${leader.last_name}, ${count} ospiti, arrivo ${formatDateIT(booking.check_in, { weekday: true })}${s(fd, "arrival_time") ? ` alle ${s(fd, "arrival_time")}` : ""}${tax ? ` · tassa di soggiorno ${tax.toFixed(2)} €` : ""}`,
  });

  await enqueueMessage("checkin_completed", booking.id);
  await dispatchMessages().catch(() => undefined);

  return { ok: true, tax };
}

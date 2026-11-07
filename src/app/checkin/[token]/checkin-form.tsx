"use client";

import { useActionState, useState } from "react";
import { submitCheckin, type CheckinState } from "./actions";

type Props = {
  token: string;
  lang: "it" | "en";
  booking: {
    id: string;
    property: string;
    check_in: string;
    check_out: string;
    guests: number | null;
    guest_name: string | null;
    guest_email: string | null;
    guest_phone: string | null;
    arrival_time: string | null;
    checkin_time: string;
    completed: boolean;
    tax_per_person_night: number;
    tax_due: boolean;
    tax_max_nights: number;
    tax_min_age: number;
    host_phone: string;
  };
};

const T = {
  it: {
    title: "Check in online",
    intro: (p: string, a: string, b: string) => `Soggiorno a ${p}, dal ${a} al ${b}. In Italia la registrazione degli ospiti è obbligatoria per legge: i dati vengono trasmessi alla Questura e conservati solo il tempo necessario.`,
    done: "Check in ricevuto, grazie! Riceverai la guida della casa due giorni prima dell'arrivo.",
    doneTax: (x: string) => `Tassa di soggiorno dovuta: ${x} €, da pagare all'arrivo.`,
    contact: "Contatti", email: "Email", phone: "Telefono (con prefisso)", arrival: "Ora di arrivo prevista",
    arrivalHint: (t: string) => `Check in dalle ${t}`,
    count: "Numero di ospiti", guest: "Ospite", leader: "Capogruppo",
    first: "Nome", last: "Cognome", sex: "Sesso", m: "Maschio", f: "Femmina", birth: "Data di nascita",
    birthPlace: "Luogo di nascita (città)", birthCountry: "Stato di nascita", citizenship: "Cittadinanza",
    resCity: "Città di residenza", resCountry: "Stato di residenza",
    doc: "Documento", docType: "Tipo", docTypes: { passport: "Passaporto", id: "Carta d'identità", license: "Patente" },
    docNumber: "Numero", docIssue: "Luogo di rilascio", docPhoto: "Foto del documento (fronte)",
    docPhotoHint: "Dal telefono puoi scattarla direttamente.",
    tax: (x: number, max: number, age: number) => `Tassa di soggiorno: ${x.toFixed(2)} € a persona per notte${max ? `, per le prime ${max} notti` : ""}${age ? `; esenti i minori di ${age} anni` : ""}. Si paga all'arrivo.`,
    consent: "Confermo che i dati sono corretti e acconsento al trattamento per gli obblighi di legge (registrazione in Questura).",
    submit: "Invia il check in", sending: "Invio…", add: "Aggiungi ospite", remove: "Rimuovi",
    help: (ph: string) => `Problemi? Scrivi su WhatsApp al ${ph}.`,
  },
  en: {
    title: "Online check-in",
    intro: (p: string, a: string, b: string) => `Stay at ${p}, from ${a} to ${b}. Guest registration is required by Italian law: your details are transmitted to the police (Questura) and kept only as long as necessary.`,
    done: "Check-in received, thank you! You will receive the house guide two days before arrival.",
    doneTax: (x: string) => `Tourist tax due: €${x}, payable on arrival.`,
    contact: "Contact details", email: "Email", phone: "Phone (with country code)", arrival: "Expected arrival time",
    arrivalHint: (t: string) => `Check-in from ${t}`,
    count: "Number of guests", guest: "Guest", leader: "Lead guest",
    first: "First name", last: "Last name", sex: "Sex", m: "Male", f: "Female", birth: "Date of birth",
    birthPlace: "Place of birth (city)", birthCountry: "Country of birth", citizenship: "Citizenship",
    resCity: "City of residence", resCountry: "Country of residence",
    doc: "Identity document", docType: "Type", docTypes: { passport: "Passport", id: "Identity card", license: "Driving licence" },
    docNumber: "Number", docIssue: "Place of issue", docPhoto: "Photo of the document (front)",
    docPhotoHint: "On a phone you can take it directly.",
    tax: (x: number, max: number, age: number) => `Tourist tax: €${x.toFixed(2)} per person per night${max ? `, for the first ${max} nights` : ""}${age ? `; children under ${age} are exempt` : ""}. Payable on arrival.`,
    consent: "I confirm the details are correct and consent to their processing for legal obligations (police registration).",
    submit: "Submit check-in", sending: "Sending…", add: "Add guest", remove: "Remove",
    help: (ph: string) => `Problems? Message us on WhatsApp at ${ph}.`,
  },
};

async function compressImage(file: File, max = 1600, quality = 0.82): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
    return blob ? new File([blob], "documento.jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

export function CheckinForm({ token, lang, booking }: Props) {
  const t = T[lang];
  const action = submitCheckin.bind(null, token);
  const [state, formAction, pending] = useActionState<CheckinState, FormData>(action, undefined);
  const [count, setCount] = useState(Math.min(Math.max(booking.guests ?? 2, 1), 12));

  if (state?.ok) {
    return (
      <div className="g-card" style={{ display: "grid", gap: 10 }}>
        <div className="g-alert g-alert-ok">{t.done}</div>
        {state.tax ? <p style={{ margin: 0 }}>{t.doneTax(state.tax.toFixed(2))}</p> : null}
        <p className="g-muted" style={{ margin: 0 }}>{t.help(booking.host_phone)}</p>
      </div>
    );
  }

  async function onSubmit(fd: FormData) {
    // Comprime le foto prima dell'invio.
    for (let i = 0; i < count; i++) {
      const f = fd.get(`g${i}_doc_photo`);
      if (f instanceof File && f.size > 0) fd.set(`g${i}_doc_photo`, await compressImage(f));
    }
    fd.set("guest_count", String(count));
    fd.set("lang", lang);
    formAction(fd);
  }

  const dateFmt = (s: string) => new Date(s + "T00:00:00").toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <form action={onSubmit} style={{ display: "grid", gap: 16 }}>
      <div className="g-card" style={{ display: "grid", gap: 8 }}>
        <h1 className="g-h1">{t.title}</h1>
        <p style={{ margin: 0, fontSize: 14 }}>{t.intro(booking.property, dateFmt(booking.check_in), dateFmt(booking.check_out))}</p>
        {booking.completed ? <div className="g-alert g-alert-info">{lang === "it" ? "Hai già inviato il check in: inviandolo di nuovo sostituisci i dati." : "You already submitted the check-in: sending it again replaces the data."}</div> : null}
      </div>

      <div className="g-card" style={{ display: "grid", gap: 12 }}>
        <strong style={{ fontWeight: 500 }}>{t.contact}</strong>
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
          <label className="g-field"><span className="g-label">{t.email}</span><input className="g-input" type="email" name="email" defaultValue={booking.guest_email ?? ""} required /></label>
          <label className="g-field"><span className="g-label">{t.phone}</span><input className="g-input" type="tel" name="phone" defaultValue={booking.guest_phone ?? ""} required /></label>
          <label className="g-field"><span className="g-label">{t.arrival}</span><input className="g-input" type="time" name="arrival_time" defaultValue={booking.arrival_time ?? ""} /><span className="g-muted">{t.arrivalHint(booking.checkin_time)}</span></label>
          <label className="g-field"><span className="g-label">{t.count}</span>
            <select className="g-select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
      </div>

      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="g-card" style={{ display: "grid", gap: 12 }}>
          <strong style={{ fontWeight: 500 }}>{i === 0 ? t.leader : `${t.guest} ${i + 1}`}</strong>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <label className="g-field"><span className="g-label">{t.first}</span><input className="g-input" name={`g${i}_first_name`} defaultValue={i === 0 ? booking.guest_name?.split(" ")[0] ?? "" : ""} required /></label>
            <label className="g-field"><span className="g-label">{t.last}</span><input className="g-input" name={`g${i}_last_name`} defaultValue={i === 0 ? booking.guest_name?.split(" ").slice(1).join(" ") ?? "" : ""} required /></label>
            <label className="g-field"><span className="g-label">{t.sex}</span>
              <select className="g-select" name={`g${i}_sex`} required defaultValue="">
                <option value="" disabled>…</option><option value="M">{t.m}</option><option value="F">{t.f}</option>
              </select>
            </label>
            <label className="g-field"><span className="g-label">{t.birth}</span><input className="g-input" type="date" name={`g${i}_birth_date`} required /></label>
            <label className="g-field"><span className="g-label">{t.birthPlace}</span><input className="g-input" name={`g${i}_birth_place`} required /></label>
            <label className="g-field"><span className="g-label">{t.birthCountry}</span><input className="g-input" name={`g${i}_birth_country`} defaultValue="" /></label>
            <label className="g-field"><span className="g-label">{t.citizenship}</span><input className="g-input" name={`g${i}_citizenship`} required /></label>
            <label className="g-field"><span className="g-label">{t.resCity}</span><input className="g-input" name={`g${i}_residence_city`} /></label>
            <label className="g-field"><span className="g-label">{t.resCountry}</span><input className="g-input" name={`g${i}_residence_country`} /></label>
          </div>
          {i === 0 ? (
            <div style={{ display: "grid", gap: 12 }}>
              <span className="g-label" style={{ fontWeight: 500 }}>{t.doc}</span>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
                <label className="g-field"><span className="g-label">{t.docType}</span>
                  <select className="g-select" name={`g${i}_doc_type`} required defaultValue="">
                    <option value="" disabled>…</option>
                    <option value="passport">{t.docTypes.passport}</option>
                    <option value="id">{t.docTypes.id}</option>
                    <option value="license">{t.docTypes.license}</option>
                  </select>
                </label>
                <label className="g-field"><span className="g-label">{t.docNumber}</span><input className="g-input" name={`g${i}_doc_number`} required /></label>
                <label className="g-field"><span className="g-label">{t.docIssue}</span><input className="g-input" name={`g${i}_doc_issue_place`} required /></label>
              </div>
              <label className="g-field"><span className="g-label">{t.docPhoto}</span>
                <input className="g-input" type="file" accept="image/*" capture="environment" name={`g${i}_doc_photo`} required={!booking.completed} />
                <span className="g-muted">{t.docPhotoHint}</span>
              </label>
            </div>
          ) : (
            <label className="g-field"><span className="g-label">{t.docPhoto} ({lang === "it" ? "facoltativa" : "optional"})</span>
              <input className="g-input" type="file" accept="image/*" capture="environment" name={`g${i}_doc_photo`} />
            </label>
          )}
        </div>
      ))}

      <div className="g-card" style={{ display: "grid", gap: 12 }}>
        {booking.tax_due ? <p style={{ margin: 0, fontSize: 14 }}>{t.tax(booking.tax_per_person_night, booking.tax_max_nights, booking.tax_min_age)}</p> : null}
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }}>
          <input type="checkbox" name="consent" value="1" required style={{ marginTop: 3 }} /> {t.consent}
        </label>
        {state?.error ? <div className="g-alert g-alert-error">{state.error}</div> : null}
        <button className="g-btn g-btn-primary" type="submit" disabled={pending} style={{ justifyContent: "center" }}>{pending ? t.sending : t.submit}</button>
        <p className="g-muted" style={{ margin: 0, textAlign: "center" }}>{t.help(booking.host_phone)}</p>
      </div>
    </form>
  );
}

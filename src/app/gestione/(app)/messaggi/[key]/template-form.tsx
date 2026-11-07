"use client";

import { useActionState } from "react";
import type { TemplateRow } from "@/lib/gestionale/messages";
import { saveTemplate, type ActionState } from "../actions";

const TRIGGERS: { value: TemplateRow["trigger"]; label: string }[] = [
  { value: "on_booking", label: "Alla prenotazione" },
  { value: "before_arrival", label: "N giorni prima dell'arrivo" },
  { value: "on_arrival", label: "Il giorno dell'arrivo" },
  { value: "before_departure", label: "N giorni prima della partenza" },
  { value: "after_departure", label: "N giorni dopo la partenza" },
  { value: "on_checkin_completed", label: "Dopo il check in online" },
  { value: "manual", label: "Solo manuale" },
];

const CHANNELS = [
  { value: "direct", label: "Diretta dal sito" },
  { value: "manual", label: "Inserita a mano" },
  { value: "airbnb", label: "Airbnb" },
  { value: "booking", label: "Booking.com" },
  { value: "vrbo", label: "Vrbo" },
  { value: "other", label: "Altri portali" },
];

export function TemplateForm({ template: t }: { template: TemplateRow }) {
  const action = saveTemplate.bind(null, t.id);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, undefined);

  return (
    <form action={formAction} className="g-card" style={{ display: "grid", gap: 16, maxWidth: 820 }}>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "2fr 1fr 1fr" }}>
        <label className="g-field"><span className="g-label">Nome</span><input className="g-input" name="name" defaultValue={t.name} required /></label>
        <label className="g-field"><span className="g-label">Quando</span>
          <select className="g-select" name="trigger" defaultValue={t.trigger}>
            {TRIGGERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <label className="g-field"><span className="g-label">Giorni (N)</span><input className="g-input" type="number" min={0} name="days_offset" defaultValue={t.days_offset} /></label>
          <label className="g-field"><span className="g-label">Ora</span><input className="g-input" type="number" min={0} max={23} name="send_hour" defaultValue={t.send_hour} /></label>
        </div>
      </div>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="g-label" style={{ marginBottom: 6 }}>Canali a cui si applica</legend>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 14 }}>
          {CHANNELS.map((c) => (
            <label key={c.value} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input type="checkbox" name="channels" value={c.value} defaultChecked={t.channels.includes(c.value)} /> {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14 }}>
        <label style={{ display: "flex", gap: 6, alignItems: "center" }}><input type="checkbox" name="active" value="1" defaultChecked={t.active} /> Attivo</label>
        <label style={{ display: "flex", gap: 6, alignItems: "center" }}><input type="checkbox" name="only_if_contact" value="1" defaultChecked={t.only_if_contact} /> Salta se manca l&apos;email (non metterlo in coda manuale)</label>
      </div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ display: "grid", gap: 10 }}>
          <strong style={{ fontWeight: 500 }}>Inglese (predefinito)</strong>
          <label className="g-field"><span className="g-label">Oggetto</span><input className="g-input" name="subject_en" defaultValue={t.subject_en} required /></label>
          <label className="g-field"><span className="g-label">Testo</span><textarea className="g-textarea" name="body_en" rows={16} defaultValue={t.body_en} required /></label>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <strong style={{ fontWeight: 500 }}>Italiano</strong>
          <label className="g-field"><span className="g-label">Oggetto</span><input className="g-input" name="subject_it" defaultValue={t.subject_it} /></label>
          <label className="g-field"><span className="g-label">Testo</span><textarea className="g-textarea" name="body_it" rows={16} defaultValue={t.body_it} /></label>
        </div>
      </div>

      {state?.error ? <div className="g-alert g-alert-error">{state.error}</div> : null}
      {state?.ok ? <div className="g-alert g-alert-ok">Salvato. Le modifiche valgono per i messaggi non ancora pianificati.</div> : null}
      <div><button className="g-btn g-btn-primary" type="submit" disabled={pending}>{pending ? "Salvo…" : "Salva"}</button></div>
    </form>
  );
}

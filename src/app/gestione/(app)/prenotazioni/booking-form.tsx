"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "./actions";
import type { BookingRow, PropertyRow } from "@/lib/gestionale/types";

type Props = {
  properties: PropertyRow[];
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  initial?: Partial<BookingRow> & { property_slug?: string };
  locked?: boolean; // prenotazione importata: date e casa non modificabili
  submitLabel: string;
};

export function BookingForm({ properties, action, initial, locked, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const initialKind = initial?.source === "block" || initial?.is_block ? "block" : initial?.source === "direct" ? "direct" : "manual";
  const [kind, setKind] = useState<string>(initialKind);
  const isBlock = kind === "block";

  const defaultProperty =
    initial?.property_id ?? properties.find((p) => p.slug === initial?.property_slug)?.id ?? properties[0]?.id;

  return (
    <form action={formAction} className="g-card" style={{ display: "grid", gap: 14, maxWidth: 640 }}>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <label className="g-field">
          <span className="g-label">Casa</span>
          <select className="g-select" name="property_id" defaultValue={defaultProperty} disabled={locked} required>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {locked ? <input type="hidden" name="property_id" value={initial?.property_id} /> : null}
        </label>
        <label className="g-field">
          <span className="g-label">Tipo</span>
          <select className="g-select" name="kind" value={kind} onChange={(e) => setKind(e.target.value)} disabled={locked}>
            <option value="manual">Prenotazione (telefono, email, conoscenti)</option>
            <option value="direct">Prenotazione diretta dal sito</option>
            <option value="block">Blocco date (lavori, uso personale)</option>
          </select>
          {locked ? <input type="hidden" name="kind" value={initialKind} /> : null}
        </label>
        <label className="g-field">
          <span className="g-label">Arrivo</span>
          <input className="g-input" type="date" name="check_in" defaultValue={initial?.check_in} readOnly={locked} required />
        </label>
        <label className="g-field">
          <span className="g-label">Partenza</span>
          <input className="g-input" type="date" name="check_out" defaultValue={initial?.check_out} readOnly={locked} required />
        </label>
      </div>

      {!isBlock ? (
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
          <label className="g-field" style={{ gridColumn: "1 / -1" }}>
            <span className="g-label">Nome ospite</span>
            <input className="g-input" name="guest_name" defaultValue={initial?.guest_name ?? ""} />
          </label>
          <label className="g-field">
            <span className="g-label">Email</span>
            <input className="g-input" type="email" name="guest_email" defaultValue={initial?.guest_email ?? ""} />
          </label>
          <label className="g-field">
            <span className="g-label">Telefono</span>
            <input className="g-input" name="guest_phone" defaultValue={initial?.guest_phone ?? ""} />
          </label>
          <label className="g-field">
            <span className="g-label">Ospiti</span>
            <input className="g-input" type="number" min={1} name="guests" defaultValue={initial?.guests ?? ""} />
          </label>
          <label className="g-field">
            <span className="g-label">Importo totale (€)</span>
            <input className="g-input" type="text" inputMode="decimal" name="total_amount" defaultValue={initial?.total_amount ?? ""} />
          </label>
          {!locked ? (
            <label className="g-field">
              <span className="g-label">Stato</span>
              <select className="g-select" name="status" defaultValue={initial?.status ?? "confirmed"}>
                <option value="confirmed">Confermata</option>
                <option value="pending">In attesa</option>
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      <label className="g-field">
        <span className="g-label">{isBlock ? "Motivo del blocco" : "Note interne"}</span>
        <textarea className="g-textarea" name="notes" rows={3} defaultValue={initial?.notes ?? ""} />
      </label>

      {!locked ? (
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
          <input type="checkbox" name="force" value="1" />
          {initial?.id ? "Salva comunque" : "Inserisci comunque"} anche se le date risultano occupate
        </label>
      ) : null}

      {state?.error ? <div className="g-alert g-alert-error">{state.error}</div> : null}
      {state && !state.error && initial?.id ? <div className="g-alert g-alert-ok">Salvato.</div> : null}

      <div>
        <button className="g-btn g-btn-primary" type="submit" disabled={pending}>
          {pending ? "Salvo…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

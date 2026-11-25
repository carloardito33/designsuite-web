"use client";

import { useState } from "react";

/** Modulo per creare un codice libero (pulizia, amici, tecnici) su un tastierino. */
export function NewCodeForm({ action }: { action: (fd: FormData) => void | Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("timeLimit");
  if (!open) {
    return (
      <div>
        <button className="g-btn" type="button" onClick={() => setOpen(true)} style={{ padding: "4px 10px", fontSize: 13 }}>+ Nuovo codice</button>
      </div>
    );
  }
  return (
    <form action={action} className="g-card" style={{ display: "grid", gap: 10, background: "#faf8f4" }}>
      <strong style={{ fontWeight: 500, fontSize: 14 }}>Nuovo codice</strong>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
        <label className="g-field">
          <span className="g-label">Nome</span>
          <input className="g-input" name="name" maxLength={20} required placeholder="es. Pulizie Rosa" />
        </label>
        <label className="g-field">
          <span className="g-label">Codice (6-12 cifre)</span>
          <input className="g-input" name="code" inputMode="numeric" pattern="[0-9]{6,12}" required />
        </label>
        <label className="g-field">
          <span className="g-label">Tipo</span>
          <select className="g-select" name="kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="timeLimit">A tempo</option>
            <option value="permanent">Permanente</option>
          </select>
        </label>
      </div>
      {kind === "timeLimit" ? (
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
          <label className="g-field">
            <span className="g-label">Inizio</span>
            <input className="g-input" type="datetime-local" name="start" required />
          </label>
          <label className="g-field">
            <span className="g-label">Fine</span>
            <input className="g-input" type="datetime-local" name="end" required />
          </label>
        </div>
      ) : (
        <p className="g-muted" style={{ margin: 0 }}>Un codice permanente resta attivo finché non lo elimini tu e non viene mai cancellato in automatico.</p>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button className="g-btn g-btn-primary" type="submit">Crea codice</button>
        <button className="g-btn" type="button" onClick={() => setOpen(false)}>Annulla</button>
      </div>
    </form>
  );
}

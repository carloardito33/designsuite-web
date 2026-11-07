"use client";

import { useState } from "react";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      // Il campo resta selezionabile a mano.
    }
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: 8, alignItems: "center" }}>
      <span className="g-label">{label}</span>
      <input className="g-input" readOnly value={value} onFocus={(e) => e.currentTarget.select()} style={{ fontSize: 12 }} />
      <button className="g-btn" type="button" onClick={copy} style={{ padding: "6px 12px", fontSize: 13 }}>
        {done ? "Copiato" : "Copia"}
      </button>
    </div>
  );
}

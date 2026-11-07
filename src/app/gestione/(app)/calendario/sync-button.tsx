"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SyncButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function sync() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/gestionale/sync", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setMsg(`Errore: ${data.error}`);
        return;
      }
      const added = (data.feeds ?? []).reduce((n: number, f: { added: number }) => n + f.added, 0);
      const errors = (data.feeds ?? []).filter((f: { ok: boolean }) => !f.ok).length;
      setMsg(errors ? `${errors} calendario/i in errore` : added ? `${added} nuove voci` : "Tutto aggiornato");
      router.refresh();
    } catch {
      setMsg("Errore di rete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <button className="g-btn" type="button" onClick={sync} disabled={busy}>
        {busy ? "Sincronizzo…" : "Sincronizza ora"}
      </button>
      {msg ? <span className="g-muted">{msg}</span> : null}
    </span>
  );
}

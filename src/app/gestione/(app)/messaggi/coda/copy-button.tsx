"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copia testo" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="g-btn"
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          // niente clipboard: il testo resta selezionabile
        }
      }}
    >
      {done ? "Copiato" : label}
    </button>
  );
}

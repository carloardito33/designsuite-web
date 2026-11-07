"use client";

import { useRouter } from "next/navigation";
import { addMonths, monthLabelIT, startOfMonth } from "@/lib/gestionale/dates";

/** Salto diretto a un mese: dai 3 precedenti ai 24 successivi. */
export function MonthPicker({ current, today }: { current: string; today: string }) {
  const router = useRouter();
  const base = startOfMonth(today);
  const options = Array.from({ length: 28 }, (_, i) => addMonths(base, i - 3));
  const value = startOfMonth(current);

  return (
    <select
      className="g-select"
      aria-label="Vai al mese"
      value={options.includes(value) ? value : ""}
      onChange={(e) => router.push(`/gestione/calendario?da=${e.target.value}`)}
      style={{ width: "auto", padding: "8px 32px 8px 12px", borderRadius: 999, fontSize: 14 }}
    >
      <option value="" disabled>Vai al mese…</option>
      {options.map((m) => (
        <option key={m} value={m}>{monthLabelIT(m)}</option>
      ))}
    </select>
  );
}

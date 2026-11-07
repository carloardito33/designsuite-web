import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/gestionale/queries";
import { addDays, diffDays, formatDateIT, todayISO } from "@/lib/gestionale/dates";
import { SOURCE_LABEL, type BookingRow } from "@/lib/gestionale/types";

export const metadata = { title: "Prenotazioni" };
export const dynamic = "force-dynamic";

export default async function PrenotazioniPage({
  searchParams,
}: {
  searchParams: Promise<{ vista?: string }>;
}) {
  const { vista } = await searchParams;
  const past = vista === "passate";
  const today = todayISO();
  const supabase = await createClient();
  const properties = await getProperties();

  let q = supabase.from("bookings").select("*").eq("is_block", false).neq("source", "block");
  q = past
    ? q.lt("check_out", today).order("check_in", { ascending: false }).limit(100)
    : q.gte("check_out", addDays(today, -1)).neq("status", "cancelled").order("check_in").limit(200);
  const { data } = await q;
  const rows = (data ?? []) as BookingRow[];

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <h1 className="g-h1">Prenotazioni</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Link className="g-btn" href="/gestione/prenotazioni" aria-current={!past ? "page" : undefined} style={!past ? { borderColor: "var(--gold)" } : undefined}>Future</Link>
          <Link className="g-btn" href="/gestione/prenotazioni?vista=passate" style={past ? { borderColor: "var(--gold)" } : undefined}>Passate</Link>
          <Link className="g-btn g-btn-primary" href="/gestione/prenotazioni/nuova">+ Nuova</Link>
        </div>
      </div>
      <div className="g-card" style={{ padding: 0, overflowX: "auto" }}>
        <table className="g-table">
          <thead>
            <tr>
              <th>Arrivo</th>
              <th>Partenza</th>
              <th>Notti</th>
              <th>Casa</th>
              <th>Ospite</th>
              <th>Canale</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={7} className="g-muted">Nessuna prenotazione.</td></tr>
            ) : rows.map((b) => (
              <tr key={b.id}>
                <td style={{ whiteSpace: "nowrap" }}>{formatDateIT(b.check_in, { weekday: true, year: true })}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDateIT(b.check_out, { weekday: true })}</td>
                <td>{diffDays(b.check_in, b.check_out)}</td>
                <td>{properties.find((p) => p.id === b.property_id)?.name}</td>
                <td><Link href={`/gestione/prenotazioni/${b.id}`} style={{ color: "inherit" }}>{b.guest_name ?? <span className="g-muted">senza nome</span>}</Link></td>
                <td>{SOURCE_LABEL[b.source]}</td>
                <td><span className="g-pill">{b.status === "confirmed" ? "confermata" : b.status === "pending" ? "in attesa" : "cancellata"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

import Link from "next/link";
import { after } from "next/server";
import { addDays, addMonths, formatDateIT, startOfMonth, todayISO } from "@/lib/gestionale/dates";
import { getBookingsInRange, getProperties } from "@/lib/gestionale/queries";
import { minutesSinceLastSync, runSync } from "@/lib/gestionale/sync";
import { SOURCE_COLOR, SOURCE_LABEL, type BookingRow } from "@/lib/gestionale/types";
import { Timeline } from "./timeline";
import { SyncButton } from "./sync-button";
import { MonthPicker } from "./month-picker";

export const metadata = { title: "Calendario" };
export const dynamic = "force-dynamic";

const WINDOW_DAYS = 62;

export default async function CalendarioPage({
  searchParams,
}: {
  searchParams: Promise<{ da?: string }>;
}) {
  const { da } = await searchParams;
  const today = todayISO();
  const from = /^\d{4}-\d{2}-\d{2}$/.test(da ?? "") ? (da as string) : addDays(today, -3);
  const to = addDays(from, WINDOW_DAYS);

  // Se l'ultima sincronizzazione è vecchia, la rilancia dopo aver risposto.
  let lastSyncMinutes: number | null = null;
  try {
    lastSyncMinutes = await minutesSinceLastSync();
    if (lastSyncMinutes === null || lastSyncMinutes > 10) {
      after(() =>
        runSync("page").catch((err) => console.error("[sync] errore in background:", err?.message ?? err)),
      );
    }
  } catch (err) {
    console.error("[sync] impossibile leggere lo stato:", err instanceof Error ? err.message : err);
  }

  const [properties, bookings] = await Promise.all([getProperties(), getBookingsInRange(from, to)]);

  const upcoming = pickUpcoming(bookings, today);
  const recentNew = bookings.filter(
    (b) => !b.is_block && Date.now() - new Date(b.first_seen_at).getTime() < 48 * 3600 * 1000,
  );

  return (
    <main>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <h1 className="g-h1">Calendario</h1>
          <p className="g-muted">
            {lastSyncMinutes === null
              ? "Nessuna sincronizzazione ancora eseguita"
              : `Ultima sincronizzazione ${Math.round(lastSyncMinutes)} min fa`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="g-btn" href={`/gestione/calendario?da=${addMonths(startOfMonth(from), -1)}`}>‹ Mese prima</Link>
          <Link className="g-btn" href="/gestione/calendario">Oggi</Link>
          <Link className="g-btn" href={`/gestione/calendario?da=${addMonths(startOfMonth(from), 1)}`}>Mese dopo ›</Link>
          <MonthPicker current={from} today={today} />
          <SyncButton />
          <Link className="g-btn g-btn-primary" href="/gestione/prenotazioni/nuova">+ Prenotazione o blocco</Link>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="g-alert g-alert-info">
          Nessuna casa trovata. Eseguire <code>supabase/schema.sql</code> nel progetto Supabase.
        </div>
      ) : null}

      <Timeline from={from} days={WINDOW_DAYS} today={today} properties={properties} bookings={bookings} newIds={new Set(recentNew.map((b) => b.id))} />

      <div className="cal-legend">
        <span style={{ ["--c" as string]: SOURCE_COLOR.airbnb }}>Airbnb</span>
        <span style={{ ["--c" as string]: SOURCE_COLOR.booking }}>Booking.com</span>
        <span style={{ ["--c" as string]: SOURCE_COLOR.direct }}>Diretta dal sito</span>
        <span style={{ ["--c" as string]: SOURCE_COLOR.manual }}>Inserita a mano</span>
        <span style={{ ["--c" as string]: "#c4bdb0" }}>Date chiuse (blocco)</span>
        <span style={{ ["--c" as string]: "var(--gold)" }}>Bordo oro: arrivata nelle ultime 48 ore</span>
      </div>

      <section style={{ marginTop: 28, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div className="g-card">
          <h2 style={{ fontSize: 15, fontWeight: 500, margin: "0 0 10px" }}>Prossimi arrivi e partenze</h2>
          {upcoming.length === 0 ? (
            <p className="g-muted">Nessun movimento nei prossimi 14 giorni.</p>
          ) : (
            <table className="g-table">
              <tbody>
                {upcoming.map((m) => (
                  <tr key={`${m.kind}-${m.booking.id}`}>
                    <td style={{ whiteSpace: "nowrap" }}>{formatDateIT(m.date, { weekday: true })}</td>
                    <td>
                      <span className="g-pill">{m.kind === "in" ? "Arrivo" : "Partenza"}</span>
                    </td>
                    <td>
                      <Link href={`/gestione/prenotazioni/${m.booking.id}`} style={{ color: "inherit" }}>
                        {properties.find((p) => p.id === m.booking.property_id)?.name}
                        {m.booking.guest_name ? ` · ${m.booking.guest_name}` : ""}
                      </Link>
                      <div className="g-muted">{SOURCE_LABEL[m.booking.source]}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="g-card">
          <h2 style={{ fontSize: 15, fontWeight: 500, margin: "0 0 10px" }}>Arrivate nelle ultime 48 ore</h2>
          {recentNew.length === 0 ? (
            <p className="g-muted">Nessuna nuova prenotazione.</p>
          ) : (
            <table className="g-table">
              <tbody>
                {recentNew.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <Link href={`/gestione/prenotazioni/${b.id}`} style={{ color: "inherit" }}>
                        {properties.find((p) => p.id === b.property_id)?.name}
                      </Link>
                      <div className="g-muted">{SOURCE_LABEL[b.source]}</div>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {formatDateIT(b.check_in)} → {formatDateIT(b.check_out)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

function pickUpcoming(bookings: BookingRow[], today: string) {
  const horizon = addDays(today, 14);
  const moves: { date: string; kind: "in" | "out"; booking: BookingRow }[] = [];
  for (const b of bookings) {
    if (b.is_block || b.source === "block") continue;
    if (b.check_in >= today && b.check_in < horizon) moves.push({ date: b.check_in, kind: "in", booking: b });
    if (b.check_out >= today && b.check_out < horizon) moves.push({ date: b.check_out, kind: "out", booking: b });
  }
  return moves.sort((a, b) => a.date.localeCompare(b.date) || (a.kind === "out" ? -1 : 1)).slice(0, 12);
}

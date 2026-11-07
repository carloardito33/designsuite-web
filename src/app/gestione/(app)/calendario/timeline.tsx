import Link from "next/link";
import { addDays, diffDays, parseISODate, weekdayShortIT } from "@/lib/gestionale/dates";
import { SOURCE_LABEL, type BookingRow, type PropertyRow } from "@/lib/gestionale/types";

const DAY_W = 44; // px per giorno
const HEAD_W = 170; // colonna delle case

const MONTHS_SHORT = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

export function Timeline({
  from,
  days,
  today,
  properties,
  bookings,
  newIds,
}: {
  from: string;
  days: number;
  today: string;
  properties: PropertyRow[];
  bookings: BookingRow[];
  newIds: Set<string>;
}) {
  const dates = Array.from({ length: days }, (_, i) => addDays(from, i));
  const to = addDays(from, days);

  // Intestazione mesi: una cella per ogni mese toccato dalla finestra.
  const months: { label: string; span: number }[] = [];
  for (const d of dates) {
    const dt = parseISODate(d);
    const label = `${MONTHS_SHORT[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
    const last = months[months.length - 1];
    if (last && last.label === label) last.span++;
    else months.push({ label, span: 1 });
  }

  const byProperty = new Map<string, BookingRow[]>();
  for (const b of bookings) {
    const list = byProperty.get(b.property_id) ?? [];
    list.push(b);
    byProperty.set(b.property_id, list);
  }

  return (
    <div className="cal-wrap">
      <div
        className="cal-grid"
        style={{ gridTemplateColumns: `${HEAD_W}px repeat(${days}, ${DAY_W}px)` }}
      >
        {/* riga mesi */}
        <div className="cal-corner" style={{ gridRow: 1 }} />
        {months.map((m, i) => (
          <div key={i} className="cal-monthhead" style={{ gridColumn: `span ${m.span}`, gridRow: 1 }}>
            {m.label}
          </div>
        ))}

        {/* riga giorni */}
        <div className="cal-corner" style={{ gridRow: 2 }} />
        {dates.map((d) => {
          const dow = parseISODate(d).getUTCDay();
          const cls = ["cal-dayhead", dow === 0 || dow === 6 ? "weekend" : "", d === today ? "today" : "", d.endsWith("-01") ? "month-start" : ""].join(" ");
          return (
            <div key={d} className={cls} style={{ gridRow: 2 }}>
              <div>{weekdayShortIT(d)}</div>
              <div style={{ fontSize: 13 }}>{Number(d.slice(8))}</div>
            </div>
          );
        })}

        {/* una riga per casa */}
        {properties.map((p, rowIdx) => {
          const row = rowIdx + 3;
          const list = dedupe(byProperty.get(p.id) ?? []);
          return (
            <RowFragment key={p.id} row={row} property={p} dates={dates} today={today} from={from} to={to} bookings={list} newIds={newIds} />
          );
        })}
      </div>
    </div>
  );
}

function RowFragment({
  row,
  property,
  dates,
  today,
  from,
  to,
  bookings,
  newIds,
}: {
  row: number;
  property: PropertyRow;
  dates: string[];
  today: string;
  from: string;
  to: string;
  bookings: BookingRow[];
  newIds: Set<string>;
}) {
  return (
    <>
      <div className="cal-rowhead" style={{ gridRow: row }}>
        {property.name}
        <small>{property.region === "milano" ? "Milano" : "Salento"} · max {property.max_guests}</small>
      </div>
      {dates.map((d, i) => {
        const dow = parseISODate(d).getUTCDay();
        const cls = ["cal-cell", dow === 0 || dow === 6 ? "weekend" : "", d === today ? "today" : "", d.endsWith("-01") ? "month-start" : ""].join(" ");
        return (
          <div key={d} className={cls} style={{ gridRow: row, gridColumn: i + 2 }}>
            <Link
              className="cal-cell-link"
              href={`/gestione/prenotazioni/nuova?casa=${property.slug}&da=${d}`}
              aria-label={`Nuova prenotazione ${property.name} dal ${d}`}
            />
          </div>
        );
      })}
      {bookings.map((b) => {
        const start = b.check_in < from ? from : b.check_in;
        const end = b.check_out > to ? to : b.check_out;
        const startIdx = diffDays(from, start);
        const len = diffDays(start, end);
        if (len <= 0) return null;
        const clippedStart = b.check_in < from;
        const clippedEnd = b.check_out > to;
        const isBlock = b.is_block || b.source === "block";
        // La barra parte a metà del giorno di arrivo e finisce a metà del giorno di partenza.
        // Posizione relativa all'area di griglia della riga (colonne 2..N), non all'intera griglia.
        const left = startIdx * DAY_W + (clippedStart ? 0 : DAY_W / 2);
        const width = len * DAY_W - (clippedStart ? 0 : DAY_W / 2) - (clippedEnd ? 0 : DAY_W / 2) - 2;
        const label = isBlock
          ? b.source === "block"
            ? b.notes || "Chiuso"
            : `Chiuso da ${SOURCE_LABEL[b.source]}`
          : `${b.guest_name ?? SOURCE_LABEL[b.source]}${b.guests ? ` · ${b.guests}` : ""}`;
        const cls = ["cal-bar", isBlock ? "is-block" : "", b.status === "pending" ? "is-pending" : "", newIds.has(b.id) ? "is-new" : ""].join(" ");
        return (
          <Link
            key={b.id}
            href={`/gestione/prenotazioni/${b.id}`}
            className={cls}
            title={`${label} · ${b.check_in} → ${b.check_out} · ${SOURCE_LABEL[b.source]}`}
            style={{
              gridRow: row,
              gridColumn: `2 / span ${dates.length}`,
              left,
              width: Math.max(width, 10),
              background: isBlock ? undefined : property.color,
              borderRadius: `${clippedStart ? 0 : 999}px ${clippedEnd ? 0 : 999}px ${clippedEnd ? 0 : 999}px ${clippedStart ? 0 : 999}px`,
            }}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Nasconde le chiusure importate dai portali che coincidono con una
 * prenotazione vera già presente (stesso intervallo): sono la stessa cosa vista
 * da due calendari.
 */
function dedupe(list: BookingRow[]): BookingRow[] {
  const real = list.filter((b) => !b.is_block && b.source !== "block");
  return list.filter((b) => {
    if (!b.is_block) return true;
    return !real.some((r) => r.check_in <= b.check_in && r.check_out >= b.check_out);
  });
}

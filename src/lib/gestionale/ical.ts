/**
 * Lettura e scrittura di calendari iCalendar (RFC 5545), limitate a ciò che
 * serve per i portali di affitti brevi: eventi con date intere.
 */

export type ICalEvent = {
  uid: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD, esclusivo
  summary: string;
  description: string;
};

/** Ricompone le righe spezzate (continuazione con spazio o tab iniziale). */
function unfold(text: string): string[] {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const out: string[] = [];
  for (const line of lines) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && out.length) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

function unescapeText(s: string): string {
  return s
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

/** Converte DTSTART/DTEND (DATE o DATE-TIME) in YYYY-MM-DD. */
function toDate(value: string): string | null {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

export function parseICal(text: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  let current: Partial<ICalEvent> & { hasDateTimeEnd?: boolean } | null = null;

  for (const raw of unfold(text)) {
    if (raw === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (raw === "END:VEVENT") {
      if (current?.start && current.uid) {
        // Un evento senza DTEND dura un giorno.
        const end = current.end ?? addOneDay(current.start);
        if (end > current.start) {
          events.push({
            uid: current.uid,
            start: current.start,
            end,
            summary: current.summary ?? "",
            description: current.description ?? "",
          });
        }
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const idx = raw.indexOf(":");
    if (idx < 0) continue;
    const left = raw.slice(0, idx);
    const value = raw.slice(idx + 1);
    const name = left.split(";")[0].toUpperCase();

    switch (name) {
      case "UID":
        current.uid = value.trim();
        break;
      case "DTSTART":
        current.start = toDate(value) ?? undefined;
        break;
      case "DTEND":
        current.end = toDate(value) ?? undefined;
        break;
      case "SUMMARY":
        current.summary = unescapeText(value).trim();
        break;
      case "DESCRIPTION":
        current.description = unescapeText(value).trim();
        break;
    }
  }
  return events;
}

function addOneDay(s: string): string {
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  return dt.toISOString().slice(0, 10);
}

/** Le voci "Not available" / "Blocked" dei portali sono chiusure, non prenotazioni. */
export function isBlockSummary(summary: string): boolean {
  const s = summary.toLowerCase();
  return (
    s.includes("not available") ||
    s.includes("non disponibile") ||
    s.includes("blocked") ||
    s.includes("unavailable") ||
    s === "closed" ||
    s.includes("closed - not available")
  );
}

// ---------------------------------------------------------------------------
// Scrittura
// ---------------------------------------------------------------------------

function escapeText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function fold(line: string): string {
  // Massimo 75 ottetti per riga; qui semplifichiamo a 73 caratteri.
  const out: string[] = [];
  let rest = line;
  while (rest.length > 73) {
    out.push(rest.slice(0, 73));
    rest = " " + rest.slice(73);
  }
  out.push(rest);
  return out.join("\r\n");
}

export function buildICal(opts: {
  calendarName: string;
  events: { uid: string; start: string; end: string; summary: string; description?: string }[];
}): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Designsuite//Gestionale//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(opts.calendarName)}`,
  ];
  for (const e of opts.events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${e.uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART;VALUE=DATE:${e.start.replace(/-/g, "")}`);
    lines.push(`DTEND;VALUE=DATE:${e.end.replace(/-/g, "")}`);
    lines.push(`SUMMARY:${escapeText(e.summary)}`);
    if (e.description) lines.push(`DESCRIPTION:${escapeText(e.description)}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

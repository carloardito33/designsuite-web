/** Utilità su date in formato YYYY-MM-DD, senza fusi orari. */

export function toISODate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(s: string, n: number): string {
  const d = parseISODate(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toISODate(d);
}

export function diffDays(a: string, b: string): number {
  return Math.round((parseISODate(b).getTime() - parseISODate(a).getTime()) / 86400000);
}

export function todayISO(): string {
  // Giorno corrente in Italia, indipendentemente dal fuso del server.
  const fmt = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" });
  return fmt.format(new Date());
}

export function startOfMonth(s: string): string {
  return s.slice(0, 8) + "01";
}

export function addMonths(s: string, n: number): string {
  const d = parseISODate(s);
  d.setUTCMonth(d.getUTCMonth() + n);
  return toISODate(d);
}

/** Intervalli [a1, a2) e [b1, b2) si sovrappongono? */
export function overlaps(a1: string, a2: string, b1: string, b2: string): boolean {
  return a1 < b2 && b1 < a2;
}

const MONTHS_IT = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];
const DAYS_IT = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];

export function formatDateIT(s: string, opts: { weekday?: boolean; year?: boolean } = {}): string {
  const d = parseISODate(s);
  const parts = [`${d.getUTCDate()} ${MONTHS_IT[d.getUTCMonth()]}`];
  if (opts.year) parts.push(String(d.getUTCFullYear()));
  const text = parts.join(" ");
  return opts.weekday ? `${DAYS_IT[d.getUTCDay()]} ${text}` : text;
}

export function monthLabelIT(s: string): string {
  const d = parseISODate(s);
  const m = MONTHS_IT[d.getUTCMonth()];
  return `${m.charAt(0).toUpperCase()}${m.slice(1)} ${d.getUTCFullYear()}`;
}

export function weekdayShortIT(s: string): string {
  return DAYS_IT[parseISODate(s).getUTCDay()];
}

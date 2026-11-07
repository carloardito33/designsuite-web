import type { TemplateRow } from "@/lib/gestionale/messages";

export const TRIGGER_LABEL: Record<TemplateRow["trigger"], string> = {
  on_booking: "Alla prenotazione",
  before_arrival: "Prima dell'arrivo",
  on_arrival: "Il giorno dell'arrivo",
  before_departure: "Prima della partenza",
  after_departure: "Dopo la partenza",
  on_checkin_completed: "Dopo il check in online",
  manual: "Solo manuale",
};

export function describeTiming(t: TemplateRow): string {
  const h = `${String(t.send_hour).padStart(2, "0")}:00`;
  switch (t.trigger) {
    case "before_arrival":
      return `${t.days_offset} giorni prima dell'arrivo alle ${h}`;
    case "before_departure":
      return `${t.days_offset} giorni prima della partenza alle ${h}`;
    case "after_departure":
      return `${t.days_offset} giorni dopo la partenza alle ${h}`;
    case "on_arrival":
      return `il giorno dell'arrivo alle ${h}`;
    default:
      return TRIGGER_LABEL[t.trigger];
  }
}


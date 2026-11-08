import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL, type MessageLogRow, type TemplateRow } from "@/lib/gestionale/messages";
import { CopyButton } from "../../messaggi/coda/copy-button";
import { sendTemplateNow } from "../../messaggi/actions";
import { markMessageDone } from "../../messaggi/actions";
import { regenerateAccessCode } from "../actions";

type Guest = {
  id: string; is_leader: boolean; first_name: string; last_name: string; sex: string | null; birth_date: string | null;
  birth_place: string | null; citizenship: string | null; doc_type: string | null; doc_number: string | null; doc_photo_path: string | null;
};

const STATUS_LABEL: Record<MessageLogRow["status"], string> = {
  scheduled: "programmato",
  sent: "inviato via email",
  manual: "da inviare a mano",
  done: "inviato a mano",
  skipped: "saltato",
  error: "errore",
};

const CODE_LABEL: Record<string, string> = { none: "non ancora creato (2 giorni prima dell'arrivo)", pending: "in creazione sul tastierino", active: "attivo", failed: "errore: tastierino non raggiungibile", deleted: "cancellato dopo la partenza" };

export async function GuestPanel({ booking }: { booking: { id: string; checkin_token: string | null; checkin_status: string; checkin_completed_at: string | null; tax_amount: number | null; arrival_time: string | null; guest_lang: string; access_code: string | null; access_code_status?: string; questura_status: string; source: string; is_block: boolean; property_id: string } }) {
  if (booking.is_block || booking.source === "block") return null;
  const supabase = await createClient();
  const [{ data: log }, { data: guests }, { data: templates }] = await Promise.all([
    supabase.from("message_log").select("*").eq("booking_id", booking.id).order("due_at"),
    supabase.from("booking_guests").select("*").eq("booking_id", booking.id).order("is_leader", { ascending: false }),
    supabase.from("message_templates").select("id, key, name, trigger").eq("active", true).order("sort_order"),
  ]);
  const { data: prop } = await supabase.from("properties").select("access_type").eq("id", booking.property_id).maybeSingle();
  const accessType = prop?.access_type ?? "none";
  const token = booking.checkin_token ?? "";
  const checkinLink = `${SITE_URL}/checkin/${token}`;
  const guideLink = `${SITE_URL}/ospiti/${token}`;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section className="g-card" style={{ display: "grid", gap: 10 }}>
        <h2 style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>
          Check in online ·{" "}
          <span className="g-pill" style={booking.checkin_status === "completed" ? { background: "#eef7ee" } : undefined}>
            {booking.checkin_status === "completed" ? `completato${booking.checkin_completed_at ? ` il ${new Date(booking.checkin_completed_at).toLocaleDateString("it-IT")}` : ""}` : "in attesa"}
          </span>
          {booking.tax_amount ? <span className="g-pill" style={{ marginLeft: 6 }}>tassa di soggiorno {Number(booking.tax_amount).toFixed(2)} €</span> : null}
          {booking.arrival_time ? <span className="g-pill" style={{ marginLeft: 6 }}>arrivo ore {booking.arrival_time}</span> : null}
        </h2>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "90px 1fr auto", alignItems: "center", fontSize: 13 }}>
          <span className="g-label">Check in</span>
          <input className="g-input" readOnly value={checkinLink} style={{ fontSize: 12 }} />
          <CopyButton text={checkinLink} label="Copia link" />
          <span className="g-label">Guida</span>
          <input className="g-input" readOnly value={guideLink} style={{ fontSize: 12 }} />
          <CopyButton text={guideLink} label="Copia link" />
        </div>
        {accessType === "switchbot" ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
            <span className="g-label">Codice serratura</span>
            <strong style={{ fontWeight: 500, letterSpacing: "0.08em" }}>{booking.access_code && booking.access_code_status !== "none" ? booking.access_code : "—"}</strong>
            <span className="g-pill" style={booking.access_code_status === "active" ? { background: "#eef7ee" } : booking.access_code_status === "failed" ? { background: "#fdf0f0" } : undefined}>{CODE_LABEL[booking.access_code_status ?? "none"]}</span>
            <form action={regenerateAccessCode.bind(null, booking.id)}><button className="g-btn" type="submit" style={{ padding: "4px 10px", fontSize: 13 }}>{booking.access_code_status === "none" ? "Crea codice ora" : "Rigenera codice"}</button></form>
          </div>
        ) : null}
        {(guests ?? []).length ? (
          <table className="g-table">
            <thead><tr><th>Ospite</th><th>Nascita</th><th>Cittadinanza</th><th>Documento</th></tr></thead>
            <tbody>
              {(guests as Guest[]).map((g) => (
                <tr key={g.id}>
                  <td>{g.first_name} {g.last_name}{g.is_leader ? <span className="g-pill" style={{ marginLeft: 6 }}>capogruppo</span> : null}</td>
                  <td>{g.birth_date ?? ""}{g.birth_place ? `, ${g.birth_place}` : ""}</td>
                  <td>{g.citizenship ?? ""}</td>
                  <td>{g.doc_type ? `${g.doc_type} ${g.doc_number ?? ""}` : ""}{g.doc_photo_path ? <> · <Link href={`/gestione/prenotazioni/${booking.id}/documento?p=${encodeURIComponent(g.doc_photo_path)}`} target="_blank" style={{ color: "inherit" }}>foto</Link></> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>

      <section className="g-card" style={{ display: "grid", gap: 10 }}>
        <h2 style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>Messaggi</h2>
        {(log ?? []).length === 0 ? <p className="g-muted" style={{ margin: 0 }}>Nessun messaggio pianificato (la pianificazione avviene a ogni sincronizzazione).</p> : (
          <table className="g-table">
            <tbody>
              {(log as MessageLogRow[]).map((m) => (
                <tr key={m.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{new Date(m.due_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" })}</td>
                  <td>{m.subject}<div className="g-muted">{STATUS_LABEL[m.status]}{m.to_email ? ` · ${m.to_email}` : ""}{m.error ? ` · ${m.error}` : ""}</div></td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {m.status === "manual" ? (
                      <span style={{ display: "inline-flex", gap: 6 }}>
                        <CopyButton text={m.body ?? ""} label="Copia" />
                        <form action={markMessageDone.bind(null, m.id)}><button className="g-btn" type="submit">Inviato</button></form>
                      </span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form action={async (fd: FormData) => { "use server"; await sendTemplateNow(booking.id, String(fd.get("key"))); }} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <select className="g-select" name="key" style={{ width: "auto" }}>
            {((templates ?? []) as Pick<TemplateRow, "key" | "name">[]).map((t) => <option key={t.key} value={t.key}>{t.name}</option>)}
          </select>
          <button className="g-btn" type="submit">Prepara e invia ora</button>
          <span className="g-muted">Email se c&apos;è l&apos;indirizzo, altrimenti testo da copiare.</span>
        </form>
      </section>
    </div>
  );
}

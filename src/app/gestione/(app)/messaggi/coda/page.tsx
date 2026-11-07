import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/gestionale/queries";
import { formatDateIT } from "@/lib/gestionale/dates";
import { SOURCE_LABEL, type BookingRow } from "@/lib/gestionale/types";
import type { MessageLogRow } from "@/lib/gestionale/messages";
import { CopyButton } from "./copy-button";
import { markMessageDone, skipMessage } from "../actions";

export const metadata = { title: "Coda messaggi" };
export const dynamic = "force-dynamic";

export default async function CodaPage() {
  const supabase = await createClient();
  const [properties, { data }] = await Promise.all([
    getProperties(),
    supabase
      .from("message_log")
      .select("*, bookings(*)")
      .in("status", ["manual", "error"])
      .order("due_at")
      .limit(100),
  ]);
  const rows = (data ?? []) as (MessageLogRow & { bookings: BookingRow })[];

  return (
    <main>
      <p className="g-muted"><Link href="/gestione/messaggi" style={{ color: "inherit" }}>‹ Messaggi</Link></p>
      <h1 className="g-h1">Da inviare a mano</h1>
      <p className="g-muted" style={{ marginBottom: 14 }}>
        Ospiti senza email (prenotazioni dai portali): copia il testo e incollalo nella chat di Airbnb o Booking, poi segna come inviato.
      </p>
      {rows.length === 0 ? (
        <div className="g-card g-muted">Niente in coda.</div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {rows.map((m) => {
            const b = m.bookings;
            const p = properties.find((x) => x.id === b.property_id);
            return (
              <div key={m.id} className="g-card" style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <strong style={{ fontWeight: 500 }}>
                      <Link href={`/gestione/prenotazioni/${b.id}`} style={{ color: "inherit" }}>{p?.name} · {b.guest_name ?? "ospite"}</Link>
                    </strong>
                    <div className="g-muted">
                      {formatDateIT(b.check_in)} → {formatDateIT(b.check_out)} · {SOURCE_LABEL[b.source]} · {m.subject}
                      {m.status === "error" ? <span style={{ color: "#a4262c" }}> · errore invio: {m.error}</span> : null}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <CopyButton text={m.body ?? ""} />
                    <form action={markMessageDone.bind(null, m.id)}><button className="g-btn g-btn-primary" type="submit">Inviato</button></form>
                    <form action={skipMessage.bind(null, m.id)}><button className="g-btn" type="submit">Salta</button></form>
                  </div>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", font: "inherit", fontSize: 14, background: "var(--pearl)", padding: 12, borderRadius: 10, margin: 0 }}>{m.body}</pre>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

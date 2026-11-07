import { getFeeds, getProperties } from "@/lib/gestionale/queries";
import { CHANNEL_LABEL } from "@/lib/gestionale/types";
import { CopyField } from "./copy-field";

export const metadata = { title: "Impostazioni" };
export const dynamic = "force-dynamic";

const SITE = "https://www.designsuite.it";

export default async function ImpostazioniPage() {
  const [properties, feeds] = await Promise.all([getProperties(), getFeeds()]);

  return (
    <main style={{ display: "grid", gap: 20 }}>
      <h1 className="g-h1">Impostazioni</h1>

      <section className="g-card">
        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 4px" }}>Calendari in uscita (da incollare nei portali)</h2>
        <p className="g-muted" style={{ marginBottom: 14 }}>
          Ogni portale riceve le date occupate dagli altri canali e i blocchi manuali. Su Airbnb: Calendario → Disponibilità → Collega calendari → Importa calendario.
          Su Booking.com: Tariffe e disponibilità → Sincronizza calendari (visibile solo senza channel manager collegato).
        </p>
        <div style={{ display: "grid", gap: 16 }}>
          {properties.map((p) => (
            <div key={p.id} style={{ display: "grid", gap: 8 }}>
              <strong style={{ fontWeight: 500 }}>{p.name}</strong>
              <CopyField label="Per Airbnb" value={`${SITE}/api/ical/${p.slug}.ics?k=${p.ical_export_token}&for=airbnb`} />
              <CopyField label="Per Booking.com" value={`${SITE}/api/ical/${p.slug}.ics?k=${p.ical_export_token}&for=booking`} />
            </div>
          ))}
        </div>
      </section>

      <section className="g-card" style={{ padding: 0, overflowX: "auto" }}>
        <div style={{ padding: "18px 18px 6px" }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Calendari in entrata</h2>
        </div>
        <table className="g-table">
          <thead>
            <tr>
              <th>Casa</th>
              <th>Portale</th>
              <th>Ultima lettura</th>
              <th>Esito</th>
              <th>Voci</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((f) => (
              <tr key={f.id}>
                <td>{properties.find((p) => p.id === f.property_id)?.name}</td>
                <td>{CHANNEL_LABEL[f.channel]}</td>
                <td className="g-muted" style={{ whiteSpace: "nowrap" }}>
                  {f.last_sync_at ? new Date(f.last_sync_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" }) : "mai"}
                </td>
                <td>
                  {f.last_status === "ok" ? <span className="g-pill" style={{ background: "#eef7ee" }}>ok</span>
                    : f.last_status === "error" ? <span className="g-pill" style={{ background: "#fdf0f0" }} title={f.last_error ?? ""}>errore: {f.last_error}</span>
                    : <span className="g-pill">in attesa</span>}
                </td>
                <td>{f.last_event_count ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="g-muted" style={{ padding: "10px 18px 16px" }}>
          Per aggiungere i calendari Booking.com (dopo aver scollegato Smoobu) basta inserire i link nella tabella <code>ical_feeds</code>; una schermata dedicata arriva con la prossima tappa.
        </p>
      </section>
    </main>
  );
}

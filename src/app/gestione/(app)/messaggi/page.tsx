import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { TemplateRow } from "@/lib/gestionale/messages";
import { describeTiming } from "./labels";

export const metadata = { title: "Messaggi" };
export const dynamic = "force-dynamic";

export default async function MessaggiPage() {
  const supabase = await createClient();
  const [{ data: templates }, { count: manualCount }] = await Promise.all([
    supabase.from("message_templates").select("*").order("sort_order"),
    supabase.from("message_log").select("id", { count: "exact", head: true }).eq("status", "manual"),
  ]);

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <h1 className="g-h1">Messaggi automatici</h1>
          <p className="g-muted">Email per chi ha lasciato un indirizzo; per gli ospiti dei portali il testo finisce nella coda da copiare nella chat.</p>
        </div>
        <Link className="g-btn g-btn-primary" href="/gestione/messaggi/coda">
          Coda da inviare a mano {manualCount ? <span className="g-pill" style={{ background: "#fff", color: "var(--gold-dk)" }}>{manualCount}</span> : null}
        </Link>
      </div>
      <div className="g-card" style={{ padding: 0, overflowX: "auto" }}>
        <table className="g-table">
          <thead>
            <tr>
              <th>Modello</th>
              <th>Quando</th>
              <th>Canali</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {(templates ?? []).length === 0 ? (
              <tr><td colSpan={4} className="g-muted">Nessun modello: eseguire <code>supabase/seed_v2.sql</code>.</td></tr>
            ) : (templates as TemplateRow[]).map((t) => (
              <tr key={t.id}>
                <td><Link href={`/gestione/messaggi/${t.key}`} style={{ color: "inherit", fontWeight: 500 }}>{t.name}</Link></td>
                <td>{describeTiming(t)}</td>
                <td className="g-muted">{t.channels.join(", ")}</td>
                <td><span className="g-pill" style={t.active ? { background: "#eef7ee" } : undefined}>{t.active ? "attivo" : "spento"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="g-muted" style={{ marginTop: 12 }}>
        Variabili disponibili nei testi: {"{{guest_name}} {{property}} {{check_in}} {{check_out}} {{nights}} {{guests}} {{checkin_link}} {{guide_link}} {{access_code}} {{lockbox_code}} {{arrival_time}} {{address}} {{wifi_ssid}} {{wifi_password}} {{review_link}} {{host_phone}} {{host_email}}"}
      </p>
    </main>
  );
}

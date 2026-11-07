import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NotificationRow } from "@/lib/gestionale/types";
import { markNotificationsRead } from "../prenotazioni/actions";

export const metadata = { title: "Avvisi" };
export const dynamic = "force-dynamic";

export default async function AvvisiPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  const rows = (data ?? []) as NotificationRow[];
  const unread = rows.filter((r) => !r.read_at).length;

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <h1 className="g-h1">Avvisi</h1>
        {unread ? (
          <form action={markNotificationsRead}>
            <button className="g-btn" type="submit">Segna tutti come letti</button>
          </form>
        ) : null}
      </div>
      <div className="g-card" style={{ padding: 0 }}>
        <table className="g-table">
          <tbody>
            {rows.length === 0 ? (
              <tr><td className="g-muted">Nessun avviso.</td></tr>
            ) : rows.map((n) => (
              <tr key={n.id} style={!n.read_at ? { background: "#fbf6e9" } : undefined}>
                <td style={{ whiteSpace: "nowrap" }} className="g-muted">
                  {new Date(n.created_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" })}
                </td>
                <td>
                  {n.booking_id ? (
                    <Link href={`/gestione/prenotazioni/${n.booking_id}`} style={{ color: "inherit", fontWeight: 500 }}>{n.title}</Link>
                  ) : (
                    <strong style={{ fontWeight: 500 }}>{n.title}</strong>
                  )}
                  {n.body ? <div className="g-muted">{n.body}</div> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

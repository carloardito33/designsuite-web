import { getProperties } from "@/lib/gestionale/queries";
import { decryptPasscode, listKeypads, queryWebhook, switchbotConfigured, type SwitchBotDevice } from "@/lib/gestionale/switchbot";
import { createClient } from "@/lib/supabase/server";
import { cleanupExpiredCodes, createManualCode, deleteSingleCode, registerSwitchbotWebhook } from "./actions";
import { NewCodeForm } from "./new-code-form";

export const metadata = { title: "SwitchBot" };
export const dynamic = "force-dynamic";

export default async function SwitchBotPage({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const { msg } = await searchParams;
  const properties = await getProperties();
  let raw: SwitchBotDevice[] = [];
  let sb: { keypads: { deviceId: string; deviceName: string; deviceType: string; keys: number; expired: number }[]; webhooks: string[]; error?: string } | null = null;
  if (switchbotConfigured()) {
    try {
      const [k0, w] = await Promise.all([listKeypads(), queryWebhook().catch(() => [] as string[])]);
      // Ordine: Muratori, Burlamacchi, Casa, poi eventuali altri tastierini.
      const ORDER = ["muratori", "burlamacchi", "casa"];
      const rank = (name: string) => {
        const i = ORDER.findIndex((o) => name.toLowerCase().includes(o));
        return i === -1 ? ORDER.length : i;
      };
      const k = [...k0].sort((a, b) => rank(a.deviceName) - rank(b.deviceName) || a.deviceName.localeCompare(b.deviceName));
      raw = k;
      sb = { keypads: k.map((d) => ({ deviceId: d.deviceId, deviceName: d.deviceName, deviceType: d.deviceType, keys: d.keyList?.length ?? 0, expired: d.keyList?.filter((x) => x.status === "expired").length ?? 0 })), webhooks: w };
    } catch (err) {
      sb = { keypads: [], webhooks: [], error: err instanceof Error ? err.message : String(err) };
    }
  }

  const supabase = await createClient();
  const { data: known } = await supabase.from("bookings").select("switchbot_key_name, access_code").not("switchbot_key_name", "is", null).not("access_code", "is", null);
  const codeByKeyName = new Map<string, string>((known ?? []).map((b) => [b.switchbot_key_name as string, b.access_code as string]));
  const { data: events } = await supabase.from("switchbot_events").select("received_at, event_name, result, command_id").order("received_at", { ascending: false }).limit(10);
  const fmtTs = (n?: number) => {
    if (!n) return "";
    const ms = n > 1e12 ? n : n * 1000;
    return new Date(ms).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" });
  };

  return (
    <main style={{ display: "grid", gap: 20 }}>
      <div>
        <h1 className="g-h1">SwitchBot</h1>
        <p className="g-muted">Codici dei tastierini: quelli degli ospiti li crea il gestionale dalle prenotazioni, gli altri (pulizie, amici, tecnici) puoi crearli qui.</p>
      </div>
      <section className="g-card" style={{ display: "grid", gap: 10 }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>Tastierini</h2>
        {!sb ? (
          <p className="g-muted" style={{ margin: 0 }}>Non configurato: servono SWITCHBOT_TOKEN e SWITCHBOT_SECRET su Vercel.</p>
        ) : sb.error ? (
          <div className="g-alert g-alert-error">{sb.error}</div>
        ) : (
          <>
            <table className="g-table">
              <thead><tr><th>Tastierino</th><th>Tipo</th><th>Codici presenti</th><th>Scaduti</th><th>Casa</th></tr></thead>
              <tbody>
                {sb.keypads.map((k) => (
                  <tr key={k.deviceId}>
                    <td>{k.deviceName}</td>
                    <td className="g-muted">{k.deviceType}</td>
                    <td>{k.keys}</td>
                    <td>{k.expired}</td>
                    <td>{properties.find((p) => (p as unknown as { switchbot_device_id?: string }).switchbot_device_id === k.deviceId)?.name ?? <span className="g-muted">da abbinare nella pagina Case</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
              <span className="g-label">Webhook esiti comandi</span>
              {sb.webhooks.includes("https://www.designsuite.it/api/switchbot/webhook") ? <span className="g-pill" style={{ background: "#eef7ee" }}>registrato</span> : (
                <form action={registerSwitchbotWebhook}><button className="g-btn" type="submit" style={{ padding: "4px 10px", fontSize: 13 }}>Registra webhook</button></form>
              )}
              {sb.webhooks.length ? <span className="g-muted">{sb.webhooks.join(", ")}</span> : null}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
              <span className="g-label">Codici scaduti</span>
              <form action={cleanupExpiredCodes}><button className="g-btn" type="submit" style={{ padding: "4px 10px", fontSize: 13 }}>Elimina ora</button></form>
              <span className="g-muted">Vengono comunque eliminati da soli a ogni sincronizzazione (ogni 10 minuti), anche quelli creati a mano nell&apos;app SwitchBot.</span>
            </div>
            {msg ? <div className={msg.startsWith("Errore") ? "g-alert g-alert-error" : "g-alert g-alert-ok"}>{msg}</div> : null}
            {raw.map((kp) => (
              <details key={kp.deviceId} className="sb-keypad">
                <summary>
                  <span className="sb-arrow" aria-hidden>▸</span>
                  <strong style={{ fontWeight: 500, fontSize: 14 }}>{kp.deviceName}</strong>
                  <span className="g-muted" style={{ fontSize: 13 }}>{(kp.keyList ?? []).length} codici</span>
                </summary>
                <div style={{ display: "grid", gap: 8, paddingTop: 6 }}>
                <table className="g-table">
                  <thead><tr><th>Nome</th><th>Codice</th><th>Tipo</th><th>Stato</th><th>Creato</th><th></th></tr></thead>
                  <tbody>
                    {(kp.keyList ?? []).map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td style={{ letterSpacing: "0.06em", fontVariantNumeric: "tabular-nums" }}>{decryptPasscode(c.password as string | undefined, c.iv as string | undefined) ?? codeByKeyName.get(c.name) ?? <span className="g-muted">non disponibile</span>}</td>
                        <td className="g-muted">{c.type === "permanent" ? "permanente" : c.type === "timeLimit" ? "a tempo" : c.type === "disposable" ? "monouso" : c.type}</td>
                        <td>{c.status === "expired" ? <span className="g-pill" style={{ background: "#fdf0f0" }}>scaduto</span> : c.status === "normal" ? "valido" : c.status}</td>
                        <td className="g-muted" style={{ whiteSpace: "nowrap" }}>{fmtTs(c.createTime)}</td>
                        <td>
                          <form action={deleteSingleCode.bind(null, kp.deviceId, c.id, c.name)}>
                            <button className="g-btn g-btn-danger" type="submit" style={{ padding: "2px 8px", fontSize: 12 }}>Elimina</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NewCodeForm action={createManualCode.bind(null, kp.deviceId)} />
                </div>
              </details>
            ))}
            {(events ?? []).length ? (
              <details className="g-muted" style={{ fontSize: 12 }}>
                <summary>Ultimi esiti dei comandi dal tastierino</summary>
                <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                  {(events ?? []).map((e, i) => (
                    <li key={i}>{new Date(e.received_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", dateStyle: "short", timeStyle: "short" })} · {e.event_name || "evento"} · {e.result ?? ""}</li>
                  ))}
                </ul>
              </details>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}

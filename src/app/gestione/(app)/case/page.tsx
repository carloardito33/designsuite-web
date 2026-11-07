import { createClient } from "@/lib/supabase/server";
import { saveProperty } from "./actions";

export const metadata = { title: "Case" };
export const dynamic = "force-dynamic";

type P = {
  id: string; slug: string; name: string; region: string; max_guests: number; min_nights: number; cleaning_fee: number;
  address: string | null; city: string | null; checkin_time: string; checkout_time: string;
  wifi_ssid: string | null; wifi_password: string | null; access_type: string; lockbox_code: string | null;
  switchbot_device_id: string | null; google_review_url: string | null; host_phone: string | null; host_email: string | null;
  tax_per_person_night: number; tax_max_nights: number; tax_min_age: number; tax_collected_by_airbnb: boolean;
};

export default async function CasePage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("properties").select("*").order("sort_order");
  const props = (data ?? []) as P[];

  return (
    <main style={{ display: "grid", gap: 20 }}>
      <div>
        <h1 className="g-h1">Case</h1>
        <p className="g-muted">Dati usati da messaggi, guida ospiti e check in. Le password restano qui e non vengono mai mostrate nei portali.</p>
      </div>
      {ok ? <div className="g-alert g-alert-ok">Salvato.</div> : null}
      {props.map((p) => (
        <form key={p.id} action={saveProperty.bind(null, p.id)} className="g-card" style={{ display: "grid", gap: 12 }}>
          <strong style={{ fontWeight: 500, fontSize: 16 }}>{p.name} <span className="g-muted">· {p.region === "milano" ? "Milano" : "Salento"}</span></strong>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label className="g-field"><span className="g-label">Indirizzo</span><input className="g-input" name="address" defaultValue={p.address ?? ""} /></label>
            <label className="g-field"><span className="g-label">Città</span><input className="g-input" name="city" defaultValue={p.city ?? ""} /></label>
            <label className="g-field"><span className="g-label">Check in dalle</span><input className="g-input" name="checkin_time" defaultValue={p.checkin_time} /></label>
            <label className="g-field"><span className="g-label">Check out entro</span><input className="g-input" name="checkout_time" defaultValue={p.checkout_time} /></label>
            <label className="g-field"><span className="g-label">Ospiti max</span><input className="g-input" type="number" name="max_guests" defaultValue={p.max_guests} /></label>
            <label className="g-field"><span className="g-label">Notti minime</span><input className="g-input" type="number" name="min_nights" defaultValue={p.min_nights} /></label>
            <label className="g-field"><span className="g-label">Pulizie (€)</span><input className="g-input" type="number" step="0.01" name="cleaning_fee" defaultValue={p.cleaning_fee} /></label>
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label className="g-field"><span className="g-label">Rete WiFi</span><input className="g-input" name="wifi_ssid" defaultValue={p.wifi_ssid ?? ""} /></label>
            <label className="g-field"><span className="g-label">Password WiFi</span><input className="g-input" name="wifi_password" defaultValue={p.wifi_password ?? ""} /></label>
            <label className="g-field"><span className="g-label">Accesso</span>
              <select className="g-select" name="access_type" defaultValue={p.access_type}>
                <option value="switchbot">Serratura SwitchBot</option>
                <option value="lockbox">Cassetta con combinazione</option>
                <option value="person">Consegna di persona</option>
                <option value="none">Nessuno</option>
              </select>
            </label>
            <label className="g-field"><span className="g-label">Combinazione cassetta</span><input className="g-input" name="lockbox_code" defaultValue={p.lockbox_code ?? ""} /></label>
            <label className="g-field"><span className="g-label">ID dispositivo SwitchBot (Keypad)</span><input className="g-input" name="switchbot_device_id" defaultValue={p.switchbot_device_id ?? ""} /></label>
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label className="g-field"><span className="g-label">Tassa di soggiorno (€ a persona a notte)</span><input className="g-input" type="number" step="0.01" name="tax_per_person_night" defaultValue={p.tax_per_person_night} /></label>
            <label className="g-field"><span className="g-label">Notti massime tassate (0 = tutte)</span><input className="g-input" type="number" name="tax_max_nights" defaultValue={p.tax_max_nights} /></label>
            <label className="g-field"><span className="g-label">Esenti sotto i (anni)</span><input className="g-input" type="number" name="tax_min_age" defaultValue={p.tax_min_age} /></label>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, alignSelf: "end", paddingBottom: 10 }}>
              <input type="checkbox" name="tax_collected_by_airbnb" value="1" defaultChecked={p.tax_collected_by_airbnb} /> Airbnb la riscuote
            </label>
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <label className="g-field"><span className="g-label">Link recensione Google</span><input className="g-input" name="google_review_url" defaultValue={p.google_review_url ?? ""} /></label>
            <label className="g-field"><span className="g-label">Telefono host</span><input className="g-input" name="host_phone" defaultValue={p.host_phone ?? ""} /></label>
            <label className="g-field"><span className="g-label">Email host</span><input className="g-input" name="host_email" defaultValue={p.host_email ?? ""} /></label>
          </div>
          <div><button className="g-btn g-btn-primary" type="submit">Salva {p.name}</button></div>
        </form>
      ))}
    </main>
  );
}

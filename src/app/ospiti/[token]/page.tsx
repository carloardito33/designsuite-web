import { createAdminClient } from "@/lib/supabase/admin";
import { getBookingByToken } from "@/lib/gestionale/checkin";
import { renderTemplate, templateVariables } from "@/lib/gestionale/messages";
import { todayISO } from "@/lib/gestionale/dates";
import { messageLang, type BookingRow, type PropertyRow } from "@/lib/gestionale/types";

export const dynamic = "force-dynamic";

type Section = {
  id: string;
  key: string;
  icon: string | null;
  title_it: string;
  title_en: string;
  body_it: string;
  body_en: string;
  show_before_arrival: boolean;
  show_during_stay: boolean;
  sort_order: number;
  property_id: string | null;
};

const ICONS: Record<string, string> = {
  host: "👋", checkin: "📝", map: "🗺️", key: "🔑", lock: "🔐", wifi: "📶", car: "🚗",
  thermometer: "🌡️", trash: "🗑️", zap: "⚡", list: "📋", coffee: "☕",
};

export default async function GuidaPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { token } = await params;
  const { lang: langParam } = await searchParams;
  const booking = await getBookingByToken(token);
  const lang: "it" | "en" = langParam === "it" || langParam === "en" ? langParam : messageLang(booking?.guest_lang);

  if (!booking || booking.status === "cancelled") {
    return (
      <main className="g-shell" style={{ maxWidth: 520, paddingTop: "10vh" }}>
        <p className="g-brand">Designsuite</p>
        <div className="g-card">{lang === "it" ? "Link non valido." : "Invalid link."}</div>
      </main>
    );
  }

  const db = createAdminClient();
  const { data } = await db
    .from("guide_sections")
    .select("*")
    .eq("active", true)
    .or(`property_id.is.null,property_id.eq.${booking.property_id}`)
    .order("sort_order");
  const today = todayISO();
  const during = today >= booking.check_in && today < booking.check_out;
  const sections = ((data ?? []) as Section[]).filter((s) => (during ? s.show_during_stay : s.show_before_arrival));

  const p = booking.properties as unknown as PropertyRow;
  const vars = templateVariables(
    { ...(booking as unknown as BookingRow), checkin_token: token, guest_lang: lang } as BookingRow & { checkin_token: string; guest_lang: string },
    p,
    lang,
  );
  // Codice non ancora emesso: la scheda resta ma senza codice.
  if (!booking.access_code && booking.properties.access_type === "switchbot") {
    vars.access_code = lang === "it" ? "(disponibile dal giorno prima dell'arrivo)" : "(available from the day before arrival)";
  }

  return (
    <main className="g-shell" style={{ maxWidth: 720, paddingTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <p className="g-brand" style={{ margin: 0 }}>Designsuite</p>
        <nav style={{ display: "flex", gap: 6, fontSize: 13 }}>
          <a href="?lang=it" className="g-pill" style={lang === "it" ? { background: "var(--gold)", color: "#fff" } : undefined}>IT</a>
          <a href="?lang=en" className="g-pill" style={lang === "en" ? { background: "var(--gold)", color: "#fff" } : undefined}>EN</a>
        </nav>
      </div>
      <h1 className="g-h1" style={{ marginBottom: 2 }}>{booking.properties.name}</h1>
      <p className="g-muted" style={{ marginBottom: 18 }}>
        {vars.check_in} → {vars.check_out}{booking.properties.address ? ` · ${vars.address}` : ""}
      </p>

      {booking.checkin_status !== "completed" ? (
        <a className="g-btn g-btn-primary" href={`/checkin/${token}?lang=${lang}`} style={{ marginBottom: 18, justifyContent: "center" }}>
          {lang === "it" ? "Completa il check in online" : "Complete the online check-in"}
        </a>
      ) : null}

      <div style={{ display: "grid", gap: 14 }}>
        {sections
          .filter((s) => !(s.key === "checkin" && booking.checkin_status === "completed"))
          .map((s) => (
            <section key={s.id} className="g-card">
              <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 8px" }}>
                <span aria-hidden style={{ marginRight: 8 }}>{ICONS[s.icon ?? ""] ?? "•"}</span>
                {lang === "it" ? s.title_it : s.title_en}
              </h2>
              <div
                className="guide-body"
                style={{ fontSize: 15, lineHeight: 1.55 }}
                dangerouslySetInnerHTML={{ __html: renderTemplate(lang === "it" ? s.body_it : s.body_en, vars) }}
              />
            </section>
          ))}
      </div>
      <p className="g-muted" style={{ marginTop: 24, textAlign: "center" }}>
        {lang === "it" ? "Per qualsiasi cosa: WhatsApp " : "For anything: WhatsApp "}
        <a href={`https://wa.me/${vars.host_phone.replace(/\D/g, "")}`} style={{ color: "inherit" }}>{vars.host_phone}</a>
      </p>
    </main>
  );
}

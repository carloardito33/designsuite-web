import { messageLang } from "@/lib/gestionale/types";
import { getBookingByToken } from "@/lib/gestionale/checkin";
import { CheckinForm } from "./checkin-form";

export const dynamic = "force-dynamic";

export default async function CheckinPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { token } = await params;
  const { lang: langParam } = await searchParams;
  const booking = await getBookingByToken(token);
  const lang = langParam === "it" || langParam === "en" ? langParam : messageLang(booking?.guest_lang);

  if (!booking || booking.status === "cancelled") {
    return (
      <main className="g-shell" style={{ maxWidth: 520, paddingTop: "10vh" }}>
        <p className="g-brand" style={{ marginBottom: 20 }}>Designsuite</p>
        <div className="g-card">
          {lang === "it" ? "Link non valido o prenotazione non trovata. Contatta Carlo su WhatsApp al +39 335 6810310." : "Invalid link or booking not found. Please contact Carlo on WhatsApp at +39 335 6810310."}
        </div>
      </main>
    );
  }

  return (
    <main className="g-shell" style={{ maxWidth: 680, paddingTop: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <p className="g-brand" style={{ margin: 0 }}>Designsuite</p>
        <nav style={{ display: "flex", gap: 6, fontSize: 13 }}>
          <a href={`?lang=it`} className="g-pill" style={lang === "it" ? { background: "var(--gold)", color: "#fff" } : undefined}>IT</a>
          <a href={`?lang=en`} className="g-pill" style={lang === "en" ? { background: "var(--gold)", color: "#fff" } : undefined}>EN</a>
        </nav>
      </div>
      <CheckinForm
        token={token}
        lang={lang}
        booking={{
          id: booking.id,
          property: booking.properties.name,
          check_in: booking.check_in,
          check_out: booking.check_out,
          guests: booking.guests,
          guest_name: booking.guest_name,
          guest_email: booking.guest_email,
          guest_phone: booking.guest_phone,
          arrival_time: booking.arrival_time,
          checkin_time: booking.properties.checkin_time,
          completed: booking.checkin_status === "completed",
          tax_per_person_night: Number(booking.properties.tax_per_person_night),
          tax_due: !(booking.properties.tax_collected_by_airbnb && booking.source === "airbnb") && Number(booking.properties.tax_per_person_night) > 0,
          tax_max_nights: booking.properties.tax_max_nights,
          tax_min_age: booking.properties.tax_min_age,
          host_phone: booking.properties.host_phone ?? "+39 335 6810310",
        }}
      />
    </main>
  );
}

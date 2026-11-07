import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooking, getProperties } from "@/lib/gestionale/queries";
import { diffDays, formatDateIT } from "@/lib/gestionale/dates";
import { SOURCE_LABEL } from "@/lib/gestionale/types";
import { BookingForm } from "../booking-form";
import { cancelBooking, updateBooking } from "../actions";
import { GuestPanel } from "./guest-panel";

export const metadata = { title: "Prenotazione" };
export const dynamic = "force-dynamic";

export default async function PrenotazionePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [booking, properties] = await Promise.all([getBooking(id), getProperties()]);
  if (!booking) notFound();
  const property = properties.find((p) => p.id === booking.property_id);
  const imported = Boolean(booking.feed_id);
  const update = updateBooking.bind(null, booking.id);
  const cancel = cancelBooking.bind(null, booking.id);

  return (
    <main style={{ display: "grid", gap: 16 }}>
      <div>
        <p className="g-muted"><Link href="/gestione/calendario" style={{ color: "inherit" }}>‹ Calendario</Link></p>
        <h1 className="g-h1">
          {property?.name} · {formatDateIT(booking.check_in, { weekday: true })} → {formatDateIT(booking.check_out, { weekday: true })}
        </h1>
        <p className="g-muted">
          {diffDays(booking.check_in, booking.check_out)} notti · {SOURCE_LABEL[booking.source]}
          {booking.is_block ? " · date chiuse" : ""}
          {booking.status === "cancelled" ? " · CANCELLATA" : ""}
          {booking.status === "pending" ? " · in attesa" : ""}
        </p>
      </div>

      {imported ? (
        <div className="g-alert g-alert-info">
          Prenotazione importata da {SOURCE_LABEL[booking.source]}: le date le gestisce il portale e si aggiornano da sole.
          Qui puoi aggiungere nome, contatti e note dell'ospite.
          {booking.description ? <div style={{ marginTop: 8, whiteSpace: "pre-wrap", fontSize: 13 }}>{booking.description}</div> : null}
        </div>
      ) : null}

      <GuestPanel booking={booking as unknown as Parameters<typeof GuestPanel>[0]["booking"]} />

      <BookingForm properties={properties} action={update} initial={booking} locked={imported} submitLabel="Salva" />

      {!imported && booking.status !== "cancelled" ? (
        <form action={cancel}>
          <button className="g-btn g-btn-danger" type="submit">
            {booking.source === "block" ? "Rimuovi blocco" : "Cancella prenotazione"}
          </button>
        </form>
      ) : null}
    </main>
  );
}

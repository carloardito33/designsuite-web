import { getProperties } from "@/lib/gestionale/queries";
import { addDays } from "@/lib/gestionale/dates";
import { BookingForm } from "../booking-form";
import { createBooking } from "../actions";

export const metadata = { title: "Nuova prenotazione" };
export const dynamic = "force-dynamic";

export default async function NuovaPrenotazione({
  searchParams,
}: {
  searchParams: Promise<{ casa?: string; da?: string }>;
}) {
  const { casa, da } = await searchParams;
  const properties = await getProperties();
  const check_in = /^\d{4}-\d{2}-\d{2}$/.test(da ?? "") ? da : undefined;
  return (
    <main>
      <h1 className="g-h1" style={{ marginBottom: 14 }}>Nuova prenotazione o blocco</h1>
      <BookingForm
        properties={properties}
        action={createBooking}
        initial={{ property_slug: casa, check_in, check_out: check_in ? addDays(check_in, 2) : undefined }}
        submitLabel="Inserisci"
      />
    </main>
  );
}

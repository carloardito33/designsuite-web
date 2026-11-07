import { createAdminClient } from "@/lib/supabase/admin";
import { diffDays } from "./dates";

export type CheckinBooking = {
  id: string;
  property_id: string;
  source: string;
  check_in: string;
  check_out: string;
  guests: number | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  guest_lang: "it" | "en";
  checkin_status: "pending" | "completed" | "not_required";
  arrival_time: string | null;
  access_code: string | null;
  tax_amount: number | null;
  status: string;
  properties: {
    id: string;
    slug: string;
    name: string;
    region: "milano" | "salento";
    address: string | null;
    city: string | null;
    checkin_time: string;
    checkout_time: string;
    wifi_ssid: string | null;
    wifi_password: string | null;
    access_type: string;
    lockbox_code: string | null;
    host_phone: string | null;
    host_email: string | null;
    tax_per_person_night: number;
    tax_max_nights: number;
    tax_min_age: number;
    tax_collected_by_airbnb: boolean;
    google_review_url: string | null;
  };
};

/** Prenotazione dal token pubblico (link del check in e della guida). */
export async function getBookingByToken(token: string): Promise<CheckinBooking | null> {
  if (!/^[a-f0-9]{16,64}$/i.test(token)) return null;
  const db = createAdminClient();
  const { data } = await db
    .from("bookings")
    .select("id, property_id, source, check_in, check_out, guests, guest_name, guest_email, guest_phone, guest_lang, checkin_status, arrival_time, access_code, tax_amount, status, properties(*)")
    .eq("checkin_token", token)
    .maybeSingle();
  return (data as unknown as CheckinBooking | null) ?? null;
}

/** Tassa di soggiorno dovuta: per persona non esente, per notte, fino al massimo di notti. */
export function computeTouristTax(
  b: Pick<CheckinBooking, "check_in" | "check_out" | "source">,
  p: CheckinBooking["properties"],
  guestBirthDates: (string | null)[],
): number {
  if (!p.tax_per_person_night) return 0;
  if (p.tax_collected_by_airbnb && b.source === "airbnb") return 0;
  const nights = diffDays(b.check_in, b.check_out);
  const billable = p.tax_max_nights > 0 ? Math.min(nights, p.tax_max_nights) : nights;
  const payers = guestBirthDates.filter((bd) => {
    if (!bd) return true;
    const age = ageAt(bd, b.check_in);
    return age >= p.tax_min_age;
  }).length;
  return Math.round(payers * billable * Number(p.tax_per_person_night) * 100) / 100;
}

function ageAt(birth: string, at: string): number {
  const [by, bm, bd] = birth.split("-").map(Number);
  const [y, m, d] = at.split("-").map(Number);
  let age = y - by;
  if (m < bm || (m === bm && d < bd)) age--;
  return age;
}

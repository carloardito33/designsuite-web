import { createClient } from "@/lib/supabase/server";
import type { BookingRow, FeedRow, PropertyRow } from "./types";

export async function getProperties(): Promise<PropertyRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return (data ?? []) as PropertyRow[];
}

/** Prenotazioni confermate o in attesa che toccano l'intervallo [from, to). */
export async function getBookingsInRange(from: string, to: string): Promise<BookingRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .neq("status", "cancelled")
    .lt("check_in", to)
    .gt("check_out", from)
    .order("check_in");
  return (data ?? []) as BookingRow[];
}

export async function getBooking(id: string): Promise<BookingRow | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("bookings").select("*").eq("id", id).maybeSingle();
  return (data as BookingRow | null) ?? null;
}

export async function getFeeds(): Promise<FeedRow[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("ical_feeds").select("*").order("channel");
  return (data ?? []) as FeedRow[];
}

/**
 * Prenotazioni che si sovrappongono a [checkIn, checkOut) per una casa,
 * escluse le chiusure importate (che spesso rispecchiano la stessa prenotazione).
 */
export async function findConflicts(
  propertyId: string,
  checkIn: string,
  checkOut: string,
  excludeId?: string,
): Promise<BookingRow[]> {
  const supabase = await createClient();
  let q = supabase
    .from("bookings")
    .select("*")
    .eq("property_id", propertyId)
    .neq("status", "cancelled")
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);
  if (excludeId) q = q.neq("id", excludeId);
  const { data } = await q;
  return (data ?? []) as BookingRow[];
}

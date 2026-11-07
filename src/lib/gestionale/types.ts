export type Region = "milano" | "salento";
export type Channel = "airbnb" | "booking" | "vrbo" | "other";
export type BookingSource = Channel | "direct" | "manual" | "block";
export type BookingStatus = "confirmed" | "pending" | "cancelled";

export type PropertyRow = {
  id: string;
  slug: string;
  name: string;
  region: Region;
  max_guests: number;
  min_nights: number;
  cleaning_fee: number;
  color: string;
  sort_order: number;
  active: boolean;
  ical_export_token: string;
};

export type FeedRow = {
  id: string;
  property_id: string;
  channel: Channel;
  url: string;
  active: boolean;
  last_sync_at: string | null;
  last_status: string | null;
  last_error: string | null;
  last_event_count: number | null;
};

export type BookingRow = {
  id: string;
  property_id: string;
  source: BookingSource;
  feed_id: string | null;
  external_uid: string | null;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD, esclusivo
  status: BookingStatus;
  is_block: boolean;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  guests: number | null;
  total_amount: number | null;
  currency: string;
  summary: string | null;
  description: string | null;
  notes: string | null;
  first_seen_at: string;
  last_seen_at: string;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NotificationRow = {
  id: string;
  created_at: string;
  type: string;
  property_id: string | null;
  booking_id: string | null;
  title: string;
  body: string | null;
  read_at: string | null;
};

export const SOURCE_LABEL: Record<BookingSource, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  vrbo: "Vrbo",
  other: "Altro portale",
  direct: "Diretta",
  manual: "Manuale",
  block: "Blocco",
};

export const CHANNEL_LABEL: Record<Channel, string> = {
  airbnb: "Airbnb",
  booking: "Booking.com",
  vrbo: "Vrbo",
  other: "Altro portale",
};

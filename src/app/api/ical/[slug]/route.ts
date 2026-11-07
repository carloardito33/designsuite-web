import { NextResponse, type NextRequest } from "next/server";
import { buildICal } from "@/lib/gestionale/ical";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Channel } from "@/lib/gestionale/types";
import { addDays, todayISO } from "@/lib/gestionale/dates";

export const dynamic = "force-dynamic";

const CHANNELS: Channel[] = ["airbnb", "booking", "vrbo", "other"];

/**
 * Calendario iCal in uscita per una casa, da incollare nei portali.
 * URL: /api/ical/<slug>.ics?k=<token>&for=<canale>
 * `for` esclude le prenotazioni che arrivano da quel canale (le ha già lui)
 * e le sue stesse chiusure, evitando rimbalzi.
 */
export async function GET(request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await ctx.params;
  const slug = rawSlug.replace(/\.ics$/i, "");
  const token = request.nextUrl.searchParams.get("k") ?? "";
  const forParam = request.nextUrl.searchParams.get("for");
  const forChannel = CHANNELS.includes(forParam as Channel) ? (forParam as Channel) : null;

  const db = createAdminClient();
  const { data: property } = await db
    .from("properties")
    .select("id, slug, name, ical_export_token")
    .eq("slug", slug)
    .maybeSingle();

  if (!property || !token || token !== property.ical_export_token) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Da 60 giorni fa in avanti: i portali non hanno bisogno dello storico.
  const from = addDays(todayISO(), -60);
  let query = db
    .from("bookings")
    .select("id, source, check_in, check_out, is_block, guest_name")
    .eq("property_id", property.id)
    .eq("status", "confirmed")
    .gte("check_out", from)
    .order("check_in");
  if (forChannel) query = query.neq("source", forChannel);

  const { data: rows } = await query;

  const events = (rows ?? []).map((b) => ({
    uid: `${b.id}@designsuite.it`,
    start: b.check_in,
    end: b.check_out,
    // Mai nomi degli ospiti verso i portali.
    summary: b.is_block || b.source === "block" ? "Not available" : "Reserved",
  }));

  const body = buildICal({ calendarName: `Designsuite · ${property.name}`, events });
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${property.slug}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}

import { createAdminClient } from "@/lib/supabase/admin";
import { formatDateIT, diffDays } from "./dates";
import { isBlockSummary, parseICal } from "./ical";
import { sendNotificationEmail } from "./notify";
import type { BookingRow, FeedRow, PropertyRow } from "./types";
import { CHANNEL_LABEL } from "./types";

export type FeedResult = {
  feedId: string;
  property: string;
  channel: string;
  ok: boolean;
  error?: string;
  events: number;
  added: number;
  updated: number;
  cancelled: number;
};

export type SyncResult = {
  runId: string | null;
  ok: boolean;
  feeds: FeedResult[];
  newBookings: { property: string; channel: string; check_in: string; check_out: string; isBlock: boolean }[];
};

const FETCH_TIMEOUT_MS = 15000;

async function fetchFeed(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": "Designsuite-Gestionale/1.0 (+https://designsuite.it)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (!text.includes("BEGIN:VCALENDAR")) throw new Error("Risposta non è un calendario iCal");
    return text;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Legge tutti i calendari attivi, allinea la tabella bookings e registra gli avvisi.
 * Idempotente: può girare ogni 10 minuti senza effetti collaterali.
 */
export async function runSync(trigger: "cron" | "manual" | "page"): Promise<SyncResult> {
  const db = createAdminClient();

  const { data: run, error: runErr } = await db
    .from("sync_runs")
    .insert({ trigger })
    .select("id")
    .single();
  if (runErr) {
    // Quasi sempre: chiave service_role mancante o errata su Vercel.
    throw new Error(`Accesso al database fallito (${runErr.message})`);
  }
  const runId = run?.id ?? null;

  const { data: feeds, error: feedsErr } = await db
    .from("ical_feeds")
    .select("*, properties!inner(id, slug, name, active)")
    .eq("active", true)
    .eq("properties.active", true);

  if (feedsErr) {
    await finishRun(db, runId, false, { error: feedsErr.message });
    return { runId, ok: false, feeds: [], newBookings: [] };
  }

  const results: FeedResult[] = [];
  const newBookings: SyncResult["newBookings"] = [];
  const now = new Date().toISOString();

  for (const feed of (feeds ?? []) as (FeedRow & { properties: Pick<PropertyRow, "id" | "slug" | "name"> })[]) {
    const propName = feed.properties.name;
    const result: FeedResult = {
      feedId: feed.id,
      property: propName,
      channel: feed.channel,
      ok: true,
      events: 0,
      added: 0,
      updated: 0,
      cancelled: 0,
    };

    try {
      const text = await fetchFeed(feed.url);
      const events = parseICal(text);
      result.events = events.length;

      const { data: existingRows } = await db
        .from("bookings")
        .select("id, external_uid, check_in, check_out, status, summary, description, is_block")
        .eq("feed_id", feed.id);
      const existing = new Map((existingRows ?? []).map((b) => [b.external_uid as string, b]));

      const seenUids = new Set<string>();

      for (const ev of events) {
        seenUids.add(ev.uid);
        const isBlock = isBlockSummary(ev.summary);
        const prev = existing.get(ev.uid);

        if (!prev) {
          const { data: inserted } = await db
            .from("bookings")
            .insert({
              property_id: feed.property_id,
              source: feed.channel,
              feed_id: feed.id,
              external_uid: ev.uid,
              check_in: ev.start,
              check_out: ev.end,
              status: "confirmed",
              is_block: isBlock,
              summary: ev.summary,
              description: ev.description || null,
              first_seen_at: now,
              last_seen_at: now,
            })
            .select("id")
            .single();
          result.added++;
          newBookings.push({ property: propName, channel: feed.channel, check_in: ev.start, check_out: ev.end, isBlock });

          // Avviso solo per prenotazioni vere, non per le chiusure dei portali
          // (che nascono quasi sempre da una prenotazione già vista altrove).
          if (!isBlock && inserted) {
            await db.from("notifications").insert({
              type: "new_booking",
              property_id: feed.property_id,
              booking_id: inserted.id,
              title: `Nuova prenotazione ${CHANNEL_LABEL[feed.channel]}: ${propName}`,
              body: `${formatDateIT(ev.start, { weekday: true })} → ${formatDateIT(ev.end, { weekday: true })} (${diffDays(ev.start, ev.end)} notti)`,
            });
          }
          continue;
        }

        const changed =
          prev.check_in !== ev.start ||
          prev.check_out !== ev.end ||
          prev.status !== "confirmed" ||
          prev.summary !== ev.summary ||
          prev.is_block !== isBlock;

        const patch: Partial<BookingRow> = { last_seen_at: now };
        if (changed) {
          Object.assign(patch, {
            check_in: ev.start,
            check_out: ev.end,
            status: "confirmed",
            cancelled_at: null,
            is_block: isBlock,
            summary: ev.summary,
            description: ev.description || null,
          });
          result.updated++;
        }
        await db.from("bookings").update(patch).eq("id", prev.id);
      }

      // Eventi spariti dal calendario del portale = prenotazione cancellata (o date riaperte).
      for (const [uid, prev] of existing) {
        if (seenUids.has(uid) || prev.status === "cancelled") continue;
        await db
          .from("bookings")
          .update({ status: "cancelled", cancelled_at: now })
          .eq("id", prev.id);
        result.cancelled++;
        if (!prev.is_block) {
          await db.from("notifications").insert({
            type: "cancelled_booking",
            property_id: feed.property_id,
            booking_id: prev.id,
            title: `Cancellazione ${CHANNEL_LABEL[feed.channel]}: ${propName}`,
            body: `${formatDateIT(prev.check_in, { weekday: true })} → ${formatDateIT(prev.check_out, { weekday: true })}`,
          });
        }
      }

      await db
        .from("ical_feeds")
        .update({ last_sync_at: now, last_status: "ok", last_error: null, last_event_count: events.length })
        .eq("id", feed.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.ok = false;
      result.error = message;
      await db
        .from("ical_feeds")
        .update({ last_sync_at: now, last_status: "error", last_error: message })
        .eq("id", feed.id);
    }

    results.push(result);
  }

  const ok = results.every((r) => r.ok);

  // Messaggi automatici: pianificazione e invio di quelli scaduti.
  let messages: unknown = null;
  try {
    const { scheduleMessages, dispatchMessages } = await import("./messages");
    const s = await scheduleMessages();
    const d = await dispatchMessages();
    messages = { ...s, ...d };
  } catch (err) {
    messages = { error: err instanceof Error ? err.message : String(err) };
  }

  await finishRun(db, runId, ok, { feeds: results, messages });

  // Email di avviso: una sola per giro, solo per prenotazioni vere.
  const real = newBookings.filter((b) => !b.isBlock);
  if (real.length) {
    const lines = real.map(
      (b) => `• ${b.property} (${CHANNEL_LABEL[b.channel as keyof typeof CHANNEL_LABEL] ?? b.channel}): ${formatDateIT(b.check_in, { weekday: true })} → ${formatDateIT(b.check_out, { weekday: true })}`,
    );
    await sendNotificationEmail(
      real.length === 1 ? `Nuova prenotazione: ${real[0].property}` : `${real.length} nuove prenotazioni`,
      `${lines.join("\n")}\n\nControlla che le date siano bloccate anche sugli altri portali.\nhttps://www.designsuite.it/gestione/calendario`,
    );
  }

  return { runId, ok, feeds: results, newBookings };
}

async function finishRun(
  db: ReturnType<typeof createAdminClient>,
  runId: string | null,
  ok: boolean,
  details: unknown,
) {
  if (!runId) return;
  await db
    .from("sync_runs")
    .update({ finished_at: new Date().toISOString(), ok, details })
    .eq("id", runId);
}

/** Minuti trascorsi dall'ultima sincronizzazione completata (null se mai eseguita). */
export async function minutesSinceLastSync(): Promise<number | null> {
  const db = createAdminClient();
  const { data } = await db
    .from("sync_runs")
    .select("finished_at")
    .not("finished_at", "is", null)
    .order("finished_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data?.finished_at) return null;
  return (Date.now() - new Date(data.finished_at).getTime()) / 60000;
}

import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/** Riceve gli esiti dei comandi del tastierino (createKey / deleteKey). */
export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as {
    eventType?: string;
    context?: { deviceMac?: string; eventName?: string; commandId?: string; result?: string };
  } | null;
  if (!payload) return NextResponse.json({ ok: false }, { status: 400 });

  const db = createAdminClient();
  const ctx = payload.context ?? {};
  const eventName = (ctx.eventName ?? "").trim();
  await db.from("switchbot_events").insert({
    event_name: eventName,
    device_mac: ctx.deviceMac ?? null,
    command_id: ctx.commandId ?? null,
    result: ctx.result ?? null,
    payload,
  });

  if (eventName === "createKey" && ctx.commandId) {
    const status = ctx.result === "success" ? "active" : "pending"; // su failed/timeout il ciclo riprova da solo
    await db.from("bookings").update({ access_code_status: status }).eq("switchbot_command_id", ctx.commandId).eq("access_code_status", "pending");
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse, type NextRequest } from "next/server";
import { runSync } from "@/lib/gestionale/sync";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Sincronizzazione dei calendari iCal.
 * Autorizzata da: header x-cron-secret (pg_cron / Vercel cron) oppure utente loggato.
 */
async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("x-cron-secret") ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  let authorized = Boolean(secret) && header === secret;
  let trigger: "cron" | "manual" = "cron";

  if (!authorized) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authorized = Boolean(user);
    trigger = "manual";
  }

  if (!authorized) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const result = await runSync(trigger);
    return NextResponse.json(result, { status: result.ok ? 200 : 207 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync] errore:", message);
    return NextResponse.json({ ok: false, error: message, feeds: [] }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}

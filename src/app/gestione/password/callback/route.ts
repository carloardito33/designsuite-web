import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Destinazione del link "imposta password": scambia il codice con una sessione e passa al modulo. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const url = request.nextUrl.clone();
  url.search = "";

  if (!code) {
    url.pathname = "/gestione/password";
    return NextResponse.redirect(url);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    url.pathname = "/gestione/password/nuova";
    url.search = `?error=${encodeURIComponent("Link scaduto o già usato: richiedi una nuova email (aprila dallo stesso dispositivo da cui l'hai richiesta)")}`;
    return NextResponse.redirect(url);
  }

  url.pathname = "/gestione/password/nuova";
  return NextResponse.redirect(url);
}

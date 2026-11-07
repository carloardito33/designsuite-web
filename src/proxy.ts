import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Italian is the default locale and is served from the root with no prefix.
// English lives under `/en`. Internally every route lives under `app/[lang]`,
// so unprefixed requests are rewritten to `/it/...` transparently.
//
// `/gestione` (area riservata) e `/api` vivono fuori dall'albero delle lingue.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API e pagine pubbliche degli ospiti (check in e guida, raggiunte da un link con token).
  if (pathname.startsWith("/api/") || pathname.startsWith("/checkin/") || pathname.startsWith("/ospiti/")) {
    return NextResponse.next();
  }

  if (pathname === "/gestione" || pathname.startsWith("/gestione/")) {
    const { response, user } = await updateSession(request);
    const isLogin = pathname === "/gestione/login";
    const isPublic = isLogin || pathname.startsWith("/gestione/password");
    if (!user && !isPublic) {
      const url = request.nextUrl.clone();
      url.pathname = "/gestione/login";
      url.search = pathname === "/gestione" ? "" : `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    if (user && isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/gestione/calendario";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // `/en` and `/en/...` already map to the `[lang]` segment — leave untouched.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // `/it` and `/it/...` are not canonical: redirect to the prefix-less URL.
  if (pathname === "/it" || pathname.startsWith("/it/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/it/, "") || "/";
    return NextResponse.redirect(url);
  }

  // Everything else is Italian content: rewrite to the `/it/...` route.
  const url = request.nextUrl.clone();
  url.pathname = `/it${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the metadata routes and any file with an extension
  // (favicon.ico, /logo.png, /images/...). `/api/ical/*.ics` ha un'estensione
  // e quindi non passa di qui: va bene, non ha bisogno del proxy.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};

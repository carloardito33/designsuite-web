import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Italian is the default locale and is served from the root with no prefix.
// English lives under `/en`. Internally every route lives under `app/[lang]`,
// so unprefixed requests are rewritten to `/it/...` transparently.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  // (favicon.ico, /logo.png, /images/...).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};

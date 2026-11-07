import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/** Mostra la foto di un documento (storage privato) all'utente autenticato. */
export async function GET(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Non autorizzato", { status: 401 });

  const path = request.nextUrl.searchParams.get("p") ?? "";
  if (!path.startsWith(`${id}/`)) return new NextResponse("Not found", { status: 404 });

  const admin = createAdminClient();
  const { data, error } = await admin.storage.from("documenti").download(path);
  if (error || !data) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(data, { headers: { "Content-Type": data.type || "image/jpeg", "Cache-Control": "private, no-store" } });
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { TemplateRow } from "@/lib/gestionale/messages";
import { TemplateForm } from "./template-form";

export const metadata = { title: "Modello" };
export const dynamic = "force-dynamic";

export default async function TemplatePage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("message_templates").select("*").eq("key", key).maybeSingle();
  if (!data) notFound();
  const t = data as TemplateRow;
  return (
    <main>
      <p className="g-muted"><Link href="/gestione/messaggi" style={{ color: "inherit" }}>‹ Messaggi</Link></p>
      <h1 className="g-h1" style={{ marginBottom: 14 }}>{t.name}</h1>
      <TemplateForm template={t} />
    </main>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { dispatchMessages, enqueueMessage } from "@/lib/gestionale/messages";

export type ActionState = { error?: string; ok?: boolean } | undefined;

export async function saveTemplate(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  const supabase = await createClient();
  const channels = fd.getAll("channels").map(String);
  const patch = {
    name: String(fd.get("name") ?? "").trim(),
    trigger: String(fd.get("trigger") ?? "manual"),
    days_offset: Number(fd.get("days_offset") ?? 0),
    send_hour: Number(fd.get("send_hour") ?? 10),
    channels,
    only_if_contact: fd.get("only_if_contact") === "1",
    active: fd.get("active") === "1",
    subject_it: String(fd.get("subject_it") ?? ""),
    subject_en: String(fd.get("subject_en") ?? ""),
    body_it: String(fd.get("body_it") ?? ""),
    body_en: String(fd.get("body_en") ?? ""),
  };
  if (!patch.name || !patch.subject_en || !patch.body_en) return { error: "Nome, oggetto e testo inglese sono obbligatori" };
  const { error } = await supabase.from("message_templates").update(patch).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/gestione/messaggi");
  return { ok: true };
}

export async function markMessageDone(id: string) {
  const supabase = await createClient();
  await supabase.from("message_log").update({ status: "done", sent_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/gestione/messaggi/coda");
}

export async function skipMessage(id: string) {
  const supabase = await createClient();
  await supabase.from("message_log").update({ status: "skipped" }).eq("id", id);
  revalidatePath("/gestione/messaggi/coda");
}

/** Mette in coda un modello per una prenotazione e prova subito a inviarlo. */
export async function sendTemplateNow(bookingId: string, templateKey: string) {
  const r = await enqueueMessage(templateKey, bookingId, { force: true });
  if (!r.error) await dispatchMessages();
  revalidatePath(`/gestione/prenotazioni/${bookingId}`);
  revalidatePath("/gestione/messaggi/coda");
  return r;
}

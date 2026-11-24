"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setupWebhook } from "@/lib/gestionale/switchbot";

export async function registerSwitchbotWebhook() {
  await setupWebhook("https://www.designsuite.it/api/switchbot/webhook");
  revalidatePath("/gestione/impostazioni");
}

export async function cleanupExpiredCodes() {
  const { cleanupExpiredKeys } = await import("@/lib/gestionale/locks");
  let msg: string;
  try {
    const res = await cleanupExpiredKeys();
    msg = res.errors.length ? `Errore: ${res.errors.join("; ")}` : `Codici scaduti eliminati: ${res.removed}`;
  } catch (err) {
    msg = `Errore: ${err instanceof Error ? err.message : String(err)}`;
  }
  revalidatePath("/gestione/impostazioni");
  redirect(`/gestione/impostazioni?msg=${encodeURIComponent(msg)}`);
}

export async function deleteSingleCode(deviceId: string, keyId: number, name: string) {
  const { deleteKey } = await import("@/lib/gestionale/switchbot");
  let msg: string;
  try {
    await deleteKey(deviceId, keyId);
    msg = `Comando di eliminazione inviato per "${name}". Ricarica la pagina tra qualche secondo per verificare.`;
  } catch (err) {
    msg = `Errore: ${err instanceof Error ? err.message : String(err)}`;
  }
  revalidatePath("/gestione/impostazioni");
  redirect(`/gestione/impostazioni?msg=${encodeURIComponent(msg)}`);
}

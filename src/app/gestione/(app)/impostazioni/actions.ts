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

/** Data e ora inserite nel modulo (ora di Roma) → Date. */
function romeInput(value: string): Date | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number) as unknown as number[];
  // Si prova con lo scarto CET e CEST e si tiene quello che corrisponde all'ora di Roma.
  for (const off of [1, 2]) {
    const dt = new Date(Date.UTC(y, mo - 1, d, h - off, mi));
    const hh = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Rome", hour: "2-digit", hour12: false }).format(dt));
    if (hh === h) return dt;
  }
  return new Date(Date.UTC(y, mo - 1, d, h - 1, mi));
}

export async function createManualCode(deviceId: string, fd: FormData) {
  const { createPermanentKey, createTimeLimitKey } = await import("@/lib/gestionale/switchbot");
  const name = String(fd.get("name") ?? "").trim();
  const code = String(fd.get("code") ?? "").replace(/\s/g, "");
  const kind = String(fd.get("kind") ?? "timeLimit");
  let msg: string;
  try {
    if (!name) throw new Error("serve un nome");
    if (name.length > 20) throw new Error("nome troppo lungo (massimo 20 caratteri)");
    if (!/^\d{6,12}$/.test(code)) throw new Error("il codice deve avere da 6 a 12 cifre");
    if (kind === "permanent") {
      await createPermanentKey(deviceId, { name, password: code });
    } else {
      const start = romeInput(String(fd.get("start") ?? ""));
      const end = romeInput(String(fd.get("end") ?? ""));
      if (!start || !end) throw new Error("indica inizio e fine");
      if (end <= start) throw new Error("la fine deve essere dopo l'inizio");
      if (end.getTime() <= Date.now()) throw new Error("la fine è già passata");
      await createTimeLimitKey(deviceId, { name, password: code, start, end });
    }
    msg = `Codice "${name}" inviato al tastierino. Ricarica la pagina tra qualche secondo: comparirà nell'elenco.`;
  } catch (err) {
    msg = `Errore: ${err instanceof Error ? err.message : String(err)}`;
  }
  revalidatePath("/gestione/impostazioni");
  redirect(`/gestione/impostazioni?msg=${encodeURIComponent(msg)}`);
}

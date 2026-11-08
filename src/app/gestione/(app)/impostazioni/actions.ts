"use server";

import { revalidatePath } from "next/cache";
import { setupWebhook } from "@/lib/gestionale/switchbot";

export async function registerSwitchbotWebhook() {
  await setupWebhook("https://www.designsuite.it/api/switchbot/webhook");
  revalidatePath("/gestione/impostazioni");
}

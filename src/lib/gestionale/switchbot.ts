import { createHmac, randomUUID } from "node:crypto";

/**
 * Client minimo per l'API SwitchBot v1.1 (serrature e tastierini).
 * Documentazione: https://github.com/OpenWonderLabs/SwitchBotAPI
 */

const BASE = "https://api.switch-bot.com/v1.1";

export type SwitchBotDevice = {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  hubDeviceId?: string;
  lockDeviceId?: string;
  keyList?: { id: number; name: string; type: string; status: string; createTime: number }[];
};

export function switchbotConfigured(): boolean {
  return Boolean(process.env.SWITCHBOT_TOKEN && process.env.SWITCHBOT_SECRET);
}

function headers(): Record<string, string> {
  const token = process.env.SWITCHBOT_TOKEN ?? "";
  const secret = process.env.SWITCHBOT_SECRET ?? "";
  const t = Date.now().toString();
  const nonce = randomUUID();
  const sign = createHmac("sha256", secret).update(token + t + nonce).digest("base64");
  return { Authorization: token, sign, t, nonce, "Content-Type": "application/json; charset=utf8" };
}

async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  if (!switchbotConfigured()) throw new Error("SwitchBot non configurato (SWITCHBOT_TOKEN / SWITCHBOT_SECRET)");
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { statusCode?: number; message?: string; body?: T };
  if (!res.ok || (json.statusCode !== undefined && json.statusCode !== 100)) {
    throw new Error(`SwitchBot ${json.statusCode ?? res.status}: ${json.message ?? res.statusText}`);
  }
  return json.body as T;
}

export async function listDevices(): Promise<SwitchBotDevice[]> {
  const body = await call<{ deviceList: SwitchBotDevice[] }>("GET", "/devices");
  return body.deviceList ?? [];
}

export async function listKeypads(): Promise<SwitchBotDevice[]> {
  return (await listDevices()).filter((d) => /keypad/i.test(d.deviceType));
}

/** Crea un codice a tempo sul tastierino. Il risultato vero arriva via webhook o si legge da keyList. */
export async function createTimeLimitKey(deviceId: string, opts: { name: string; password: string; start: Date; end: Date }) {
  const body = await call<{ commandId: string }>("POST", `/devices/${deviceId}/commands`, {
    commandType: "command",
    command: "createKey",
    parameter: {
      name: opts.name,
      type: "timeLimit",
      password: opts.password,
      startTime: Math.floor(opts.start.getTime() / 1000),
      endTime: Math.floor(opts.end.getTime() / 1000),
    },
  });
  return body?.commandId ?? null;
}

export async function deleteKey(deviceId: string, keyId: number | string) {
  const body = await call<{ commandId: string }>("POST", `/devices/${deviceId}/commands`, {
    commandType: "command",
    command: "deleteKey",
    parameter: { id: String(keyId) },
  });
  return body?.commandId ?? null;
}

export async function setupWebhook(url: string) {
  await call("POST", "/webhook/setupWebhook", { action: "setupWebhook", url, deviceList: "ALL" });
}

export async function queryWebhook(): Promise<string[]> {
  const body = await call<{ urls?: string[] }>("POST", "/webhook/queryWebhook", { action: "queryUrl" });
  return body?.urls ?? [];
}

/** Codice numerico casuale di 6 cifre (senza zero iniziale per evitare confusioni). */
/**
 * Codice dal numero di telefono dell'ospite, senza prefisso internazionale.
 * "+39 333 123 4567" → "31234567" (al massimo 8 cifre, le ultime). Ritorna null se il numero
 * non è usabile (servono almeno 6 cifre).
 */
export function passcodeFromPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  let d = phone.replace(/\D/g, "");
  const intl = phone.trim().startsWith("+") || d.startsWith("00");
  if (d.startsWith("00")) d = d.slice(2);
  if (intl) {
    if (d.startsWith("39")) d = d.slice(2);
    else if (d.length > 10) d = d.slice(-10);
  }
  // Al massimo 8 cifre: si tengono le ultime (le prime sono il prefisso dell'operatore).
  if (d.length > 8) d = d.slice(-8);
  if (d.length < 6) return null;
  if (/^(\d)\1+$/.test(d)) return null;
  return d;
}

export function randomPasscode(): string {
  const first = 1 + Math.floor(Math.random() * 9);
  let rest = "";
  for (let i = 0; i < 5; i++) rest += Math.floor(Math.random() * 10);
  return `${first}${rest}`;
}

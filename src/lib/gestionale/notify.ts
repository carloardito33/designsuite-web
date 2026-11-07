/**
 * Invio email tramite Resend (API HTTP, senza SDK).
 * Attivo solo se RESEND_API_KEY è configurata.
 */
export type SendEmailResult = { ok: true; id?: string } | { ok: false; error: string };

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
  from?: string;
}): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY non configurata" };
  const from = opts.from ?? process.env.NOTIFY_FROM ?? "Designsuite <gestionale@designsuite.it>";
  const to = Array.isArray(opts.to) ? opts.to : opts.to.split(",").map((s) => s.trim()).filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Avviso interno a Rosanna/Carlo (NOTIFY_EMAIL). */
export async function sendNotificationEmail(subject: string, text: string): Promise<boolean> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) return false;
  const r = await sendEmail({ to, subject, text });
  return r.ok;
}

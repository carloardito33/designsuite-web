/**
 * Invio email di avviso tramite Resend (API HTTP, senza SDK).
 * Attivo solo se RESEND_API_KEY e NOTIFY_EMAIL sono configurati; altrimenti
 * gli avvisi restano soltanto nell'app.
 */
export async function sendNotificationEmail(subject: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM ?? "Designsuite <gestionale@designsuite.it>";
  if (!apiKey || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

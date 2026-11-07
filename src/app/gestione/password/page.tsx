import Link from "next/link";
import { requestPasswordReset } from "../login/actions";

export const metadata = { title: "Password" };

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ inviata?: string }>;
}) {
  const { inviata } = await searchParams;
  return (
    <main className="g-shell" style={{ maxWidth: 420, paddingTop: "12vh" }}>
      <p className="g-brand" style={{ marginBottom: 24 }}>Designsuite · Gestionale</p>
      {inviata ? (
        <div className="g-card" style={{ display: "grid", gap: 14 }}>
          <div className="g-alert g-alert-ok">
            Se l&apos;indirizzo è abilitato, riceverai un&apos;email con il link per impostare la password. Controlla anche la posta indesiderata.
          </div>
          <Link className="g-btn" href="/gestione/login" style={{ justifyContent: "center" }}>Torna all&apos;accesso</Link>
        </div>
      ) : (
        <form action={requestPasswordReset} className="g-card" style={{ display: "grid", gap: 14 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Inserisci la tua email: ti mandiamo un link per scegliere la password.</p>
          <label className="g-field">
            <span className="g-label">Email</span>
            <input className="g-input" type="email" name="email" autoComplete="username" required />
          </label>
          <button className="g-btn g-btn-primary" type="submit" style={{ justifyContent: "center" }}>
            Invia il link
          </button>
          <p className="g-muted" style={{ textAlign: "center", margin: 0 }}>
            <Link href="/gestione/login" style={{ color: "inherit" }}>Torna all&apos;accesso</Link>
          </p>
        </form>
      )}
    </main>
  );
}

import Link from "next/link";
import { login } from "./actions";

export const metadata = { title: "Accesso" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  return (
    <main className="g-shell" style={{ maxWidth: 420, paddingTop: "12vh" }}>
      <p className="g-brand" style={{ marginBottom: 24 }}>Designsuite · Gestionale</p>
      <form action={login} className="g-card" style={{ display: "grid", gap: 14 }}>
        <input type="hidden" name="next" value={next ?? ""} />
        <label className="g-field">
          <span className="g-label">Email</span>
          <input className="g-input" type="email" name="email" autoComplete="username" required />
        </label>
        <label className="g-field">
          <span className="g-label">Password</span>
          <input className="g-input" type="password" name="password" autoComplete="current-password" required />
        </label>
        {error ? <div className="g-alert g-alert-error">{error}</div> : null}
        <button className="g-btn g-btn-primary" type="submit" style={{ justifyContent: "center" }}>
          Entra
        </button>
        <p className="g-muted" style={{ textAlign: "center", margin: 0 }}>
          <Link href="/gestione/password" style={{ color: "inherit" }}>Imposta o reimposta la password</Link>
        </p>
      </form>
    </main>
  );
}

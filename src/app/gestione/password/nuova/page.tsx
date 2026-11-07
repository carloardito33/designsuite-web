import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { setNewPassword } from "../../login/actions";

export const metadata = { title: "Nuova password" };
export const dynamic = "force-dynamic";

export default async function NuovaPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="g-shell" style={{ maxWidth: 420, paddingTop: "12vh" }}>
      <p className="g-brand" style={{ marginBottom: 24 }}>Designsuite · Gestionale</p>
      {!user ? (
        <div className="g-card" style={{ display: "grid", gap: 14 }}>
          <div className="g-alert g-alert-error">{error ?? "Apri questa pagina dal link ricevuto per email."}</div>
          <Link className="g-btn" href="/gestione/password" style={{ justifyContent: "center" }}>Richiedi un nuovo link</Link>
        </div>
      ) : (
        <form action={setNewPassword} className="g-card" style={{ display: "grid", gap: 14 }}>
          <p style={{ margin: 0, fontSize: 14 }}>Scegli la password per {user.email}.</p>
          <label className="g-field">
            <span className="g-label">Nuova password (almeno 10 caratteri)</span>
            <input className="g-input" type="password" name="password" autoComplete="new-password" minLength={10} required />
          </label>
          <label className="g-field">
            <span className="g-label">Ripeti la password</span>
            <input className="g-input" type="password" name="confirm" autoComplete="new-password" minLength={10} required />
          </label>
          {error ? <div className="g-alert g-alert-error">{error}</div> : null}
          <button className="g-btn g-btn-primary" type="submit" style={{ justifyContent: "center" }}>
            Salva e entra
          </button>
        </form>
      )}
    </main>
  );
}

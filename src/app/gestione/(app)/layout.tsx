import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import { NavLinks } from "./nav-links";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .is("read_at", null);

  return (
    <div className="g-shell">
      <header className="g-top">
        <Link href="/gestione/calendario" className="g-brand">
          Designsuite · Gestionale
        </Link>
        <NavLinks unread={count ?? 0} />
        <form action={logout}>
          <button className="g-btn" type="submit" style={{ padding: "6px 12px", fontSize: 13 }}>
            Esci
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}

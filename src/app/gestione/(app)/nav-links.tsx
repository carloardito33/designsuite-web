"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/gestione/calendario", label: "Calendario" },
  { href: "/gestione/prenotazioni", label: "Prenotazioni" },
  { href: "/gestione/messaggi", label: "Messaggi" },
  { href: "/gestione/avvisi", label: "Avvisi" },
  { href: "/gestione/case", label: "Case" },
  { href: "/gestione/impostazioni", label: "Impostazioni" },
];

export function NavLinks({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav className="g-nav" aria-label="Sezioni">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
            {l.label}
            {l.href.endsWith("/avvisi") && unread > 0 ? (
              <span className="g-pill" style={{ marginLeft: 6, background: "var(--gold)", color: "#fff" }}>
                {unread}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

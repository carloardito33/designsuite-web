"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/#milano", label: "Milano" },
  { href: "/#salento", label: "Salento" },
  { href: "/#contatti", label: "Contatti" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showSolid = !isHome || scrolled;

  return (
    <nav id="navbar" className={showSolid ? "scrolled" : undefined}>
      <Link href="/" className="nav-brand">
        <span className="nav-logo-text">Designsuite</span>
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((item) => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        <li>
          <a href="/#contatti" className="nav-cta">
            Prenota
          </a>
        </li>
      </ul>
    </nav>
  );
}

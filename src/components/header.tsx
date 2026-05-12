"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localizedPath, type Locale } from "@/i18n/config";
import { LocaleSwitch } from "./locale-switch";

type NavLabels = {
  milano: string;
  salento: string;
  contatti: string;
  book: string;
};

export function Header({
  lang,
  nav,
  switchLabel,
}: {
  lang: Locale;
  nav: NavLabels;
  switchLabel: string;
}) {
  const pathname = usePathname();
  const home = localizedPath(lang, "/");
  const isHome = pathname === home || pathname === `${home}/`;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showSolid = !isHome || scrolled;

  const links = [
    { href: `${home}#milano`, label: nav.milano },
    { href: `${home}#salento`, label: nav.salento },
    { href: `${home}#contatti`, label: nav.contatti },
  ];

  return (
    <nav id="navbar" className={showSolid ? "scrolled" : undefined}>
      <Link href={home} className="nav-brand">
        <Image
          src="/logo.png"
          alt="Designsuite"
          width={40}
          height={40}
          className="nav-logo-img"
          priority
        />
        <span className="nav-logo-text">Designsuite</span>
      </Link>
      <ul className="nav-links">
        {links.map((item) => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
        <li>
          <a href={`${home}#residenze`} className="nav-cta">
            {nav.book}
          </a>
        </li>
        <li>
          <LocaleSwitch current={lang} label={switchLabel} />
        </li>
      </ul>
    </nav>
  );
}

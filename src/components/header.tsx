"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/#salento", label: "Salento" },
  { href: "/#milano", label: "Milano" },
  { href: "/#contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)]/90 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-widest uppercase text-[var(--charcoal)]"
        >
          DesignSuite
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-widest uppercase text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-[var(--charcoal)]"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-[var(--border)] bg-[var(--cream)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest uppercase text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

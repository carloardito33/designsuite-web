"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localizedPath, stripLocale, type Locale } from "@/i18n/config";

export function LocaleSwitch({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? "/";
  const canonical = stripLocale(pathname);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase"
      aria-label={label}
    >
      {locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="opacity-30">/</span>}
          {l === current ? (
            <span aria-current="true" className="font-medium">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={localizedPath(l, canonical)}
              hrefLang={l}
              className="opacity-55 hover:opacity-100 transition-opacity"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}

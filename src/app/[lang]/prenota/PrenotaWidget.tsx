"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";

declare global {
  interface Window {
    BookingToolIframe?: {
      initialize: (opts: {
        url: string;
        baseUrl: string;
        target: string;
      }) => void;
    };
  }
}

const SMOOBU_ACCOUNT = "694911";
const SMOOBU_BASE = "https://login.smoobu.com";
const TARGET = "#smoobu-widget";

export function PrenotaWidget({
  lang,
  labels,
}: {
  lang: Locale;
  labels: { eyebrow: string; title: string; body: string };
}) {
  const initialized = useRef(false);
  const [apartmentId, setApartmentId] = useState<string | null>(null);
  const [aptResolved, setAptResolved] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setApartmentId(params.get("apt"));
    setAptResolved(true);
  }, []);

  const init = () => {
    if (initialized.current) return;
    if (!aptResolved) return;
    if (!window.BookingToolIframe) return;
    const base = `${SMOOBU_BASE}/${lang}/booking-tool/iframe/${SMOOBU_ACCOUNT}`;
    const url = apartmentId ? `${base}/${apartmentId}` : base;
    window.BookingToolIframe.initialize({
      url,
      baseUrl: SMOOBU_BASE,
      target: TARGET,
    });
    initialized.current = true;
  };

  useEffect(() => {
    if (aptResolved) init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aptResolved]);

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--charcoal)]/50 mb-3">
          {labels.eyebrow}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)]">
          {labels.title}
        </h1>
        <p className="mt-4 text-[var(--charcoal)]/60 text-sm max-w-xl mx-auto">
          {labels.body}
        </p>
      </div>
      <div id="smoobu-widget" />
      <Script
        src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"
        strategy="afterInteractive"
        onLoad={init}
      />
    </div>
  );
}

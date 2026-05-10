"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

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

export default function PrenotaPage() {
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
    const url = apartmentId
      ? `${SMOOBU_BASE}/it/booking-tool/iframe/${SMOOBU_ACCOUNT}/${apartmentId}`
      : `${SMOOBU_BASE}/it/booking-tool/iframe/${SMOOBU_ACCOUNT}`;
    window.BookingToolIframe.initialize({
      url,
      baseUrl: SMOOBU_BASE,
      target: TARGET,
    });
    initialized.current = true;
  };

  useEffect(() => {
    if (aptResolved) init();
  }, [aptResolved]);

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--charcoal)]/50 mb-3">
          Prenota la tua residenza
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)]">
          Verifica disponibilità
        </h1>
        <p className="mt-4 text-[var(--charcoal)]/60 text-sm max-w-xl mx-auto">
          Seleziona le date e prenota direttamente. Nessuna commissione,
          conferma immediata.
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

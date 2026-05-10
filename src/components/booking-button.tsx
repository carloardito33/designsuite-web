"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Script from "next/script";

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

interface Props {
  apartmentId?: string;
  className?: string;
  children: React.ReactNode;
}

export function BookingButton({ apartmentId, className, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>
      {open && (
        <BookingModal
          apartmentId={apartmentId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function BookingModal({
  apartmentId,
  onClose,
}: {
  apartmentId?: string;
  onClose: () => void;
}) {
  const initialized = useRef(false);

  const init = () => {
    if (initialized.current) return;
    if (typeof window === "undefined") return;
    if (!window.BookingToolIframe) return;
    const url = apartmentId
      ? `${SMOOBU_BASE}/it/booking-tool/iframe/${SMOOBU_ACCOUNT}/${apartmentId}`
      : `${SMOOBU_BASE}/it/booking-tool/iframe/${SMOOBU_ACCOUNT}`;
    window.BookingToolIframe.initialize({
      url,
      baseUrl: SMOOBU_BASE,
      target: "#smoobu-modal-target",
    });
    initialized.current = true;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    init();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl max-h-[92vh] overflow-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-3 right-3 z-10 p-2 bg-white/95 hover:bg-white rounded-full text-[var(--charcoal)] transition-colors shadow-md"
        >
          <X size={18} />
        </button>
        <div className="p-6 sm:p-10">
          <div className="mb-6 pr-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--charcoal)]/50 mb-2">
              Prenotazione diretta
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[var(--charcoal)]">
              Verifica disponibilità
            </h2>
          </div>
          <div id="smoobu-modal-target" />
        </div>
        <Script
          src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"
          strategy="afterInteractive"
          onLoad={init}
        />
      </div>
    </div>
  );
}

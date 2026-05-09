"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const AUTOPLAY_MS = 3500;
const FADE_MS = 700;

export function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  // previous frame held during crossfade so the outgoing image stays visible
  const [outgoing, setOutgoing] = useState<{ src: string; key: number } | null>(
    null,
  );
  const fadeTimer = useRef<number | null>(null);

  const transitionTo = useCallback(
    (next: number) => {
      setOutgoing((prevOutgoing) => {
        // capture the current src before swap; if there was already an outgoing, drop it
        return null; // reset; effect below will set new outgoing on index change
      });
      setIndex((curr) => {
        if (curr === null) return next;
        // remember outgoing for crossfade
        setOutgoing({ src: images[curr], key: Date.now() });
        return next;
      });
    },
    [images],
  );

  const close = useCallback(() => {
    setIndex(null);
    setOutgoing(null);
  }, []);
  const next = useCallback(() => {
    setIndex((i) => {
      if (i === null) return null;
      setOutgoing({ src: images[i], key: Date.now() });
      return (i + 1) % images.length;
    });
  }, [images]);
  const prev = useCallback(() => {
    setIndex((i) => {
      if (i === null) return null;
      setOutgoing({ src: images[i], key: Date.now() });
      return (i - 1 + images.length) % images.length;
    });
  }, [images]);

  // remove outgoing once fade completes
  useEffect(() => {
    if (!outgoing) return;
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    fadeTimer.current = window.setTimeout(() => setOutgoing(null), FADE_MS);
    return () => {
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
    };
  }, [outgoing]);

  // keyboard + body scroll lock
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, next, prev]);

  // autoplay 3.5s, riarmato ad ogni cambio di index
  useEffect(() => {
    if (index === null) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, next]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => transitionTo(i)}
            className="relative aspect-[4/3] overflow-hidden bg-[var(--ivory)] cursor-pointer group block"
          >
            <Image
              src={src}
              alt={`${name} — foto ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galleria ${name}`}
          className="fixed inset-0 z-[200] bg-black/96"
          onClick={close}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="relative w-[86vw] h-[78vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {outgoing && (
                <FadeOutImage
                  key={outgoing.key}
                  src={outgoing.src}
                  alt={`${name} — foto precedente`}
                />
              )}
              <FadeInImage
                key={`in-${index}`}
                src={images[index]}
                alt={`${name} — foto ${index + 1}`}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Chiudi galleria"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-5 right-5 md:top-7 md:right-7 z-10 text-white/85 hover:text-white p-2"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Foto precedente"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/75 hover:text-white p-3"
          >
            <ChevronLeft size={36} strokeWidth={1.4} />
          </button>

          <button
            type="button"
            aria-label="Foto successiva"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/75 hover:text-white p-3"
          >
            <ChevronRight size={36} strokeWidth={1.4} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/65 text-[11px] tracking-[0.24em] uppercase font-light pointer-events-none">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

function FadeInImage({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      className="absolute inset-0 transition-opacity ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority
        className="object-contain"
      />
    </div>
  );
}

function FadeOutImage({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(false));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      className="absolute inset-0 transition-opacity ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
    </div>
  );
}

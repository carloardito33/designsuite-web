"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setIndex(i)}
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
          className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Chiudi galleria"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-5 right-5 md:top-7 md:right-7 text-white/80 hover:text-white p-2"
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
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
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
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
          >
            <ChevronRight size={36} strokeWidth={1.4} />
          </button>

          <div
            className="relative w-[94vw] h-[86vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${name} — foto ${index + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/65 text-[11px] tracking-[0.24em] uppercase font-light">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

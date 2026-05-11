import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getGuestInfoPage, guestInfoPages } from "@/lib/guest-info";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guestInfoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuestInfoPage(slug);
  return {
    title: page ? `${page.property} — ${page.category}` : "Informazioni ospiti",
    robots: { index: false, follow: false },
  };
}

export default async function GuestInfoPage({ params }: Props) {
  const { slug } = await params;
  const page = getGuestInfoPage(slug);
  if (!page) notFound();

  return (
    <div className="pt-16">
      {page.heroImage && (
        <section className="relative h-[40vh] min-h-[280px] bg-[var(--charcoal)]">
          <Image
            src={page.heroImage}
            alt={page.property}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-1">
              {page.property} · {page.category}
              {page.categoryEn ? ` / ${page.categoryEn}` : ""}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-white">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-white/70 text-sm mt-1">{page.subtitle}</p>
            )}
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        {!page.heroImage && (
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--charcoal)]/50 mb-1">
              {page.property} · {page.category}
              {page.categoryEn ? ` / ${page.categoryEn}` : ""}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-[var(--charcoal)]">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-[var(--charcoal)]/60 text-sm mt-1">
                {page.subtitle}
              </p>
            )}
          </div>
        )}

        {page.intro && (
          <p className="mb-6 leading-relaxed text-sm">
            <span className="text-[var(--charcoal)]/80">{page.intro}</span>
            {page.introEn && (
              <span className="block text-[var(--charcoal)]/40 italic">
                {page.introEn}
              </span>
            )}
          </p>
        )}

        {page.notice && (
          <div className="mb-8 border-l-2 border-[var(--warm-brown)] bg-[var(--beige)] px-4 py-2.5 text-sm">
            <span className="text-[var(--charcoal)] font-medium">
              {page.notice}
            </span>
            {page.noticeEn && (
              <span className="block text-[var(--charcoal)]/45 italic">
                {page.noticeEn}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {page.steps.map((step, i) => (
            <figure key={i} className="space-y-1.5">
              <div className="relative aspect-square bg-[var(--beige)] overflow-hidden rounded-sm">
                <Image
                  src={step.image}
                  alt={step.caption ?? `${page.property} — passo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>
              {step.caption && (
                <figcaption className="text-xs leading-snug">
                  <span className="text-[var(--charcoal)]/80">
                    {step.caption}
                  </span>
                  {step.captionEn && (
                    <span className="block text-[var(--charcoal)]/40 italic">
                      {step.captionEn}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {page.footnote && (
          <p className="mt-6 text-xs leading-relaxed">
            <span className="text-[var(--charcoal)]/55">{page.footnote}</span>
            {page.footnoteEn && (
              <span className="block text-[var(--charcoal)]/35 italic">
                {page.footnoteEn}
              </span>
            )}
          </p>
        )}

        <div className="mt-10 pt-6 border-t border-[var(--border)] text-xs text-[var(--charcoal)]/40">
          Pagina informativa per gli ospiti di {page.property}. Assistenza:{" "}
          <a
            href="https://wa.me/393356810310"
            className="underline underline-offset-2"
          >
            WhatsApp +39 335 6810 310
          </a>
        </div>
      </div>
    </div>
  );
}

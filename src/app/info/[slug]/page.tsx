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
        <section className="relative h-[45vh] min-h-[320px] bg-[var(--charcoal)]">
          <Image
            src={page.heroImage}
            alt={page.property}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-2">
              {page.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-white/70 text-sm mt-2">{page.subtitle}</p>
            )}
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!page.heroImage && (
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--charcoal)]/50 mb-2">
              {page.property} · {page.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--charcoal)]">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-[var(--charcoal)]/60 text-sm mt-2">
                {page.subtitle}
              </p>
            )}
          </div>
        )}

        {page.intro && (
          <p className="text-[var(--charcoal)]/75 leading-relaxed mb-8">
            {page.intro}
          </p>
        )}

        {page.notice && (
          <div className="mb-8 border-l-2 border-[var(--warm-brown)] bg-[var(--beige)] px-5 py-3 text-sm text-[var(--charcoal)]">
            {page.notice}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {page.steps.map((step, i) => (
            <figure key={i} className="space-y-2">
              <div className="relative aspect-square bg-[var(--beige)] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.caption ?? `${page.property} — passo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {step.caption && (
                <figcaption className="text-sm text-[var(--charcoal)]/70 leading-relaxed">
                  {step.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {page.footnote && (
          <p className="mt-8 text-xs text-[var(--charcoal)]/50 leading-relaxed">
            {page.footnote}
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-[var(--border)] text-xs text-[var(--charcoal)]/40">
          Pagina informativa per gli ospiti di {page.property}. Per assistenza:{" "}
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

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Users,
  Bed,
  Bath,
  MapPin,
  Check,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import {
  getProperty,
  localizeProperty,
  properties,
  WHATSAPP_URL,
} from "@/lib/properties";
import { getGallery } from "@/lib/galleries";
import { PropertyGallery } from "@/components/property-gallery";
import { BookingButton } from "@/components/booking-button";
import { isLocale, localizedPath, locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Params = { lang: string; region: string; slug: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    properties.map((p) => ({ lang, region: p.region, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, region, slug } = await params;
  if (!isLocale(lang)) return {};
  const base = getProperty(slug);
  if (!base || base.region !== region) return {};
  const property = localizeProperty(base, lang);
  return {
    title: property.metaTitle,
    description: property.metaDescription,
    openGraph: {
      title: property.metaTitle,
      description: property.metaDescription,
      images: [{ url: property.heroImage, width: 1920, height: 800 }],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { lang, region, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const base = getProperty(slug);
  if (!base || base.region !== region) notFound();
  const property = localizeProperty(base, locale);
  const d = getDictionary(locale);

  const fsGallery = getGallery(slug);
  const gallery = fsGallery.length > 0 ? fsGallery : property.gallery;

  const backLabel =
    property.region === "salento" ? d.property.backSalento : d.property.backMilano;
  const backHref =
    localizedPath(locale, "/") +
    (property.region === "salento" ? "#salento" : "#milano");

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] bg-[var(--charcoal)]">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3 flex items-center gap-2">
            <MapPin size={11} />
            {property.location}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-white">
            {property.name}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 py-8 border-b border-[var(--border)] text-sm text-[var(--charcoal)]/60">
          <span className="flex items-center gap-2">
            <Users size={14} />
            {t(d.property.guests, { n: property.guests })}
          </span>
          <span className="flex items-center gap-2">
            <Bed size={14} />
            {property.bedrooms}{" "}
            {property.bedrooms === 1
              ? d.property.bedroomOne
              : d.property.bedroomMany}
          </span>
          <span className="flex items-center gap-2">
            <Bath size={14} />
            {property.bathrooms}{" "}
            {property.bathrooms === 1
              ? d.property.bathroomOne
              : d.property.bathroomMany}
          </span>
          <a
            href={
              property.mapsUrl ??
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--charcoal)] transition-colors underline-offset-4 hover:underline"
          >
            <MapPin size={14} />
            {property.address}
          </a>
        </div>
        <p className="text-xs text-[var(--charcoal)]/40 pt-3">
          {t(d.property.cinLine, { cin: property.cin, owner: property.owner })}
        </p>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-3 gap-16 py-16">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl font-light text-[var(--charcoal)] mb-6">
              {property.subtitle}
            </h2>
            <div className="space-y-4 text-[var(--charcoal)]/75 leading-relaxed">
              {property.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-serif text-2xl font-light text-[var(--charcoal)] mb-6">
                {d.property.amenities}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {property.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 text-sm text-[var(--charcoal)]/75"
                  >
                    <Check
                      size={13}
                      className="text-[var(--warm-brown)] shrink-0"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="font-serif text-2xl font-light text-[var(--charcoal)] mb-6">
                {d.property.services}
              </h3>
              <ul className="space-y-2">
                {property.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 text-sm text-[var(--charcoal)]/75"
                  >
                    <Check
                      size={13}
                      className="text-[var(--warm-brown)] shrink-0"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar: booking */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-[var(--beige)] p-8 space-y-4">
              <p className="font-serif text-xl font-light text-[var(--charcoal)]">
                {d.property.bookTitle}
              </p>
              <p className="text-sm text-[var(--charcoal)]/60 leading-relaxed">
                {d.property.bookBody}
              </p>
              <BookingButton
                apartmentId={property.smoobuApartmentId}
                lang={locale}
                labels={d.booking}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--warm-brown)] text-white text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors"
              >
                {d.property.bookOnline}
              </BookingButton>
              <a
                href={WHATSAPP_URL}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--charcoal)] text-white text-sm tracking-widest uppercase hover:bg-[var(--warm-brown)] transition-colors"
              >
                <MessageCircle size={15} />
                {d.property.whatsapp}
              </a>
              <p className="text-xs text-[var(--charcoal)]/40 pt-2">
                {d.property.bookNote}
              </p>
            </div>
          </aside>
        </div>

        {/* Gallery */}
        <div className="pb-16">
          <h3 className="font-serif text-3xl font-light text-[var(--charcoal)] mb-8">
            {d.property.gallery}
          </h3>
          <PropertyGallery
            images={gallery}
            name={property.name}
            labels={d.galleryUi}
          />
        </div>

        {/* Back link */}
        <div className="pb-16 border-t border-[var(--border)] pt-10">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-sm text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors"
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

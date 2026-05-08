import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { ContactSection } from "@/components/contact-section";
import { propertiesByRegion, HERO_IMAGE } from "@/lib/properties";

export default function Home() {
  const salento = propertiesByRegion("salento");
  const milano = propertiesByRegion("milano");

  return (
    <>
      <section className="relative h-screen min-h-[600px] flex items-end pb-20">
        <div className="absolute inset-0 bg-[var(--charcoal)]">
          <Image
            src={HERO_IMAGE}
            alt="DesignSuite — Affitti di lusso a Milano e in Salento"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4">
            Milano · Salento
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.1] max-w-2xl">
            Ville e suite di design tra Milano e il Salento
          </h1>
          <p className="mt-6 text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            Quattro proprietà selezionate. Architettura curata, posizioni
            uniche, comfort senza compromessi.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#salento"
              className="px-7 py-3.5 bg-white text-[var(--charcoal)] text-sm tracking-widest uppercase hover:bg-[var(--beige)] transition-colors"
            >
              Scopri le proprietà
            </Link>
            <Link
              href="#contatti"
              className="px-7 py-3.5 border border-white/50 text-white text-sm tracking-widest uppercase hover:border-white transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>

      {/* Salento */}
      <section id="salento" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--warm-brown)]">
            Puglia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)]">
            Salento
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {salento.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[var(--border)]" />
      </div>

      {/* Milano */}
      <section id="milano" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
        <div className="flex items-baseline gap-4 mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--warm-brown)]">
            Lombardia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)]">
            Milano
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {milano.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-[var(--beige)] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)] mb-6">
            Spazi pensati per chi non vuole rinunciare al bello
          </h2>
          <p className="text-[var(--charcoal)]/70 leading-relaxed text-base md:text-lg">
            DesignSuite nasce dalla convinzione che un soggiorno temporaneo
            possa essere tanto curato quanto una casa vissuta. Ogni proprietà
            è stata selezionata e allestita con attenzione ai dettagli:
            architettura, materiali, posizione. Niente di casuale.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

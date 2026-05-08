import { MessageCircle, Mail } from "lucide-react";
import { WHATSAPP_URL, EMAIL } from "@/lib/properties";

export function ContactSection() {
  return (
    <section
      id="contatti"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.3em] uppercase text-[var(--warm-brown)]">
          Disponibilità e prenotazioni
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--charcoal)] mt-3 mb-8">
          Scrivici
        </h2>
        <p className="text-[var(--charcoal)]/70 leading-relaxed mb-10">
          Per verificare disponibilità, richiedere informazioni o prenotare
          direttamente, scrivici su WhatsApp o via email. Risponderemo entro
          poche ore.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={WHATSAPP_URL}
            className="flex items-center gap-3 px-7 py-4 bg-[var(--charcoal)] text-white text-sm tracking-widest uppercase hover:bg-[var(--warm-brown)] transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 px-7 py-4 border border-[var(--charcoal)] text-[var(--charcoal)] text-sm tracking-widest uppercase hover:bg-[var(--beige)] transition-colors"
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

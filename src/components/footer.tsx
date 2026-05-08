import Link from "next/link";
import { properties, WHATSAPP_URL, EMAIL } from "@/lib/properties";

export function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-white/60 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-serif text-2xl font-medium text-white tracking-widest uppercase mb-3">
            DesignSuite
          </p>
          <p className="text-sm leading-relaxed">
            Affitti brevi di design a Milano e in Salento. Quattro proprietà
            selezionate per chi non vuole rinunciare al bello.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-white mb-4">
            Proprietà
          </p>
          <ul className="space-y-2 text-sm">
            {properties.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.region}/${p.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-white mb-4">
            Contatti
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                className="hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-white transition-colors"
              >
                {EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-6 pt-6 border-t border-white/10 space-y-1 text-xs">
            <Link
              href="/privacy-policy"
              className="block hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/termini-e-condizioni"
              className="block hover:text-white transition-colors"
            >
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 max-w-6xl mx-auto px-6 py-4 text-xs">
        © {new Date().getFullYear()} DesignSuite. Tutti i diritti riservati.
      </div>
    </footer>
  );
}

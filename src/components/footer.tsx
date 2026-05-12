import Image from "next/image";
import Link from "next/link";
import { EMAIL } from "@/lib/properties";
import { localizedPath, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["footer"];
}) {
  return (
    <footer id="contatti">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            <Image
              src="/logo.png"
              alt="Designsuite"
              width={48}
              height={48}
              className="footer-logo-img"
            />
            <span className="footer-logo-text">Designsuite</span>
          </div>
          <p className="footer-tagline">{dict.tagline}</p>
        </div>
        <div className="footer-contacts">
          <div>
            <p className="footer-contact-label">{dict.phone}</p>
            <a href="tel:+393356810310" className="footer-contact-value">
              +39 335 6810 310
            </a>
          </div>
          <div>
            <p className="footer-contact-label">{dict.email}</p>
            <a href={`mailto:${EMAIL}`} className="footer-contact-value">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="footer-contact-label">{dict.social}</p>
            <a
              href="https://www.instagram.com/designsuite.it/?hl=it"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-value"
            >
              Instagram · @designsuite.it
            </a>
            <a
              href="https://www.facebook.com/designsuite.it"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-value"
            >
              Facebook · @designsuite.it
            </a>
          </div>
        </div>
        <div className="footer-badges">
          <div className="footer-badge">{dict.badgeSuperhost}</div>
          <div className="footer-badge">{dict.badgeBooking}</div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t(dict.rights, { year: new Date().getFullYear() })}</p>
        <div className="footer-links">
          <Link href={localizedPath(lang, "/privacy-policy")}>
            {dict.privacy}
          </Link>
          <Link href={localizedPath(lang, "/termini-e-condizioni")}>
            {dict.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}

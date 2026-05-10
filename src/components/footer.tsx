import Image from "next/image";
import Link from "next/link";
import { EMAIL } from "@/lib/properties";

export function Footer() {
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
          <p className="footer-tagline">Il lusso è nei dettagli.</p>
        </div>
        <div className="footer-contacts">
          <div>
            <p className="footer-contact-label">Telefono</p>
            <a href="tel:+393356810310" className="footer-contact-value">
              +39 335 6810 310
            </a>
          </div>
          <div>
            <p className="footer-contact-label">Email</p>
            <a href={`mailto:${EMAIL}`} className="footer-contact-value">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="footer-contact-label">Social</p>
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
          <div className="footer-badge">✦ Airbnb Superhost</div>
          <div className="footer-badge">✦ Booking.com Award</div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Designsuite. Tutti i diritti riservati.
        </p>
        <div className="footer-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/termini-e-condizioni">Termini e Condizioni</Link>
        </div>
      </div>
    </footer>
  );
}

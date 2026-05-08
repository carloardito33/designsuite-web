import { PropertyCard } from "@/components/property-card";
import { getProperty } from "@/lib/properties";

export default function Home() {
  const villaCrea = getProperty("villa-crea")!;
  const bosco = getProperty("bosco-degli-ulivi")!;
  const suite1 = getProperty("suite-porta-romana")!;
  const suite2 = getProperty("suite-porta-romana-2")!;

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>Milano · Puglia · Salento</span>
          </div>
          <h1>
            Vivi il design.
            <br />
            Ovunque tu sia.
          </h1>
          <p className="hero-sub">
            Appartamenti e ville di lusso curati in ogni dettaglio.
            Dall&apos;eleganza urbana di Milano alla magia del Salento, ogni
            residenza è un&apos;esperienza unica.
          </p>
          <div className="hero-actions">
            <a href="#residenze" className="btn-pearl">
              Scopri le residenze
            </a>
            <a href="#contatti" className="btn-gold">
              Prenota ora
            </a>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-item">
          <div className="trust-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>4.9 / 5.0</strong>
            <span>200+ recensioni</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Airbnb Superhost</strong>
            <span>Certificato</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>4 residenze</strong>
            <span>Milano e Salento</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V9h14v12zm0-14H5V5h14v2zM7 11h5v5H7z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Check-in flessibile</strong>
            <span>Sempre disponibili</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.76 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.93 4.53 4.92.42-3.73 3.23L16.24 18z" />
            </svg>
          </div>
          <div className="trust-text">
            <strong>Booking Award</strong>
            <span>Ospitalità eccellente</span>
          </div>
        </div>
      </div>

      <section id="residenze">
        <div className="section-header">
          <p className="section-eyebrow">Le nostre residenze</p>
          <h2>Dal centro di Milano al cuore del Salento</h2>
        </div>
        <div className="residences">
          <div id="salento" className="city-block salento-block">
            <div className="city-header">
              <div className="city-header-line" />
              <div>
                <span className="city-name">Puglia · Salento</span>
                <p className="city-desc">
                  Il mare, gli ulivi, il silenzio. Le nostre ville nel Salento
                  sono esperienze uniche nel cuore della Puglia più autentica.
                </p>
              </div>
            </div>
            <div className="cards-grid two">
              <PropertyCard
                property={villaCrea}
                bgClass="salento-1"
                location="Salento · Puglia"
                tags={["Fino a 8 ospiti", "Piscina", "Giardino"]}
                priceFromEUR={350}
              />
              <PropertyCard
                property={bosco}
                bgClass="salento-2"
                location="Salento · Puglia"
                tags={["Fino a 6 ospiti", "Piscina", "BBQ"]}
                priceFromEUR={400}
              />
            </div>
          </div>

          <div id="milano" className="city-block milano-block">
            <div className="city-header">
              <div className="city-header-line" />
              <div>
                <span className="city-name">Milano</span>
                <p className="city-desc">
                  Design, cultura e gastronomia. Le nostre suite a Porta Romana
                  sono il punto di partenza ideale per esplorare la Milano che
                  conta.
                </p>
              </div>
            </div>
            <div className="cards-grid two">
              <PropertyCard
                property={suite1}
                bgClass="milano-1"
                location="Milano · Porta Romana"
                tags={["Ideale per 2", "Fino a 4", "WiFi"]}
                priceFromEUR={120}
              />
              <PropertyCard
                property={suite2}
                bgClass="milano-2"
                location="Milano · Porta Romana"
                tags={["Ideale per 2", "Fino a 4", "WiFi"]}
                priceFromEUR={120}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="why-grid">
          <div className="why-item">
            <div className="why-number">4.9</div>
            <p className="why-title">Valutazione media</p>
            <p className="why-desc">
              Ogni residenza curata nei minimi dettagli per un soggiorno
              impeccabile.
            </p>
          </div>
          <div className="why-item">
            <div className="why-number">500+</div>
            <p className="why-title">Ospiti soddisfatti</p>
            <p className="why-desc">
              Ospitalità d&apos;eccellenza riconosciuta da Airbnb e Booking.com.
            </p>
          </div>
          <div className="why-item">
            <div className="why-number">4</div>
            <p className="why-title">Residenze esclusive</p>
            <p className="why-desc">
              Due nel cuore di Milano, due nella meraviglia del Salento.
            </p>
          </div>
          <div className="why-item">
            <div className="why-number">24h</div>
            <p className="why-title">Assistenza continua</p>
            <p className="why-desc">
              Sempre disponibili prima, durante e dopo il soggiorno.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

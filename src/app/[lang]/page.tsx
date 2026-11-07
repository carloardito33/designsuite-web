import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { getProperty } from "@/lib/properties";
import { isLocale, t } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const TRUST_ICONS = [
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  "M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V9h14v12zm0-14H5V5h14v2zM7 11h5v5H7z",
  "M12 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.76 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.93 4.53 4.92.42-3.73 3.23L16.24 18z",
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  const villaCrea = getProperty("villa-crea")!;
  const bosco = getProperty("bosco-degli-ulivi")!;
  const suite1 = getProperty("suite-porta-romana")!;
  const suite2 = getProperty("suite-porta-romana-2")!;

  const cardLabels = {
    discover: d.card.discover,
    priceFrom: d.card.priceFrom,
    perNight: d.card.perNight,
  };

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>{d.hero.eyebrow}</span>
          </div>
          <h1>
            {d.hero.titleLine1}
            <br />
            {d.hero.titleLine2}
          </h1>
          <p className="hero-sub">{d.hero.subtitle}</p>
          <div className="hero-actions">
            <a href="#residenze" className="btn-pearl">
              {d.hero.cta}
            </a>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        {d.trust.map((item, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d={TRUST_ICONS[i]} />
              </svg>
            </div>
            <div className="trust-text">
              <strong>{item.strong}</strong>
              <span>{item.span}</span>
            </div>
          </div>
        ))}
      </div>

      <section id="residenze">
        <div className="section-header">
          <p className="section-eyebrow">{d.residences.eyebrow}</p>
          <h2>{d.residences.title}</h2>
        </div>
        <div className="residences">
          <div id="salento" className="city-block salento-block">
            <div className="city-header">
              <div className="city-header-line" />
              <div>
                <span className="city-name">{d.residences.salento.name}</span>
                <p className="city-desc">{d.residences.salento.desc}</p>
              </div>
            </div>
            <div className="cards-grid two">
              <PropertyCard
                property={villaCrea}
                lang={lang}
                bgClass="salento-1"
                location={d.residences.salento.cardLocation}
                tags={[t(d.residences.tagUpToGuests, { n: 8 })]}
                priceFromEUR={400}
                labels={cardLabels}
              />
              <PropertyCard
                property={bosco}
                lang={lang}
                bgClass="salento-2"
                location={d.residences.salento.cardLocation}
                tags={[t(d.residences.tagUpToGuests, { n: 6 })]}
                priceFromEUR={300}
                labels={cardLabels}
              />
            </div>
          </div>

          <div id="milano" className="city-block milano-block">
            <div className="city-header">
              <div className="city-header-line" />
              <div>
                <span className="city-name">{d.residences.milano.name}</span>
                <p className="city-desc">{d.residences.milano.desc}</p>
              </div>
            </div>
            <div className="cards-grid two">
              <PropertyCard
                property={suite1}
                lang={lang}
                bgClass="milano-1"
                location={d.residences.milano.cardLocation}
                tags={[d.residences.tagIdealFor2, d.residences.tagUpTo4]}
                priceFromEUR={120}
                labels={cardLabels}
              />
              <PropertyCard
                property={suite2}
                lang={lang}
                bgClass="milano-2"
                location={d.residences.milano.cardLocation}
                tags={[d.residences.tagIdealFor2, d.residences.tagUpTo4]}
                priceFromEUR={120}
                labels={cardLabels}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="why-grid">
          {d.why.map((item, i) => (
            <div className="why-item" key={i}>
              <div className="why-number">{item.number}</div>
              <p className="why-title">{item.title}</p>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";
import { localizedPath, t, type Locale } from "@/i18n/config";

type Props = {
  property: Property;
  lang: Locale;
  bgClass: "salento-1" | "salento-2" | "milano-1" | "milano-2";
  location: string;
  tags: string[];
  priceFromEUR: number;
  labels: { discover: string; priceFrom: string; perNight: string };
};

export function PropertyCard({
  property,
  lang,
  bgClass,
  location,
  tags,
  priceFromEUR,
  labels,
}: Props) {
  return (
    <Link
      href={localizedPath(lang, `/${property.region}/${property.slug}`)}
      className="card"
    >
      <div className={`card-img ${bgClass}`}>
        <Image
          src={property.cardImage}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="card-overlay" />
      <span className="card-discover">{labels.discover}</span>
      <div className="card-body">
        <p className="card-location">{location}</p>
        <h3 className="card-title">{property.name}</h3>
        <div className="card-meta">
          {tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
          <div className="card-price">
            <strong>{t(labels.priceFrom, { n: priceFromEUR })}</strong>
            <span>{labels.perNight}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

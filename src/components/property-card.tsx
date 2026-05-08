import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";

type Props = {
  property: Property;
  bgClass: "salento-1" | "salento-2" | "milano-1" | "milano-2";
  location: string;
  tags: string[];
  priceFromEUR: number;
};

export function PropertyCard({
  property,
  bgClass,
  location,
  tags,
  priceFromEUR,
}: Props) {
  return (
    <Link href={`/${property.region}/${property.slug}`} className="card">
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
      <span className="card-discover">Scopri →</span>
      <div className="card-body">
        <p className="card-location">{location}</p>
        <h3 className="card-title">{property.name}</h3>
        <p className="card-desc">{property.shortDescription}</p>
        <div className="card-meta">
          {tags.map((t) => (
            <span key={t} className="card-tag">
              {t}
            </span>
          ))}
          <div className="card-price">
            <strong>da €{priceFromEUR}</strong>
            <span>a notte</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

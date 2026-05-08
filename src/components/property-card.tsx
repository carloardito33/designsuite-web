import Link from "next/link";
import Image from "next/image";
import { Users, Bed, Bath } from "lucide-react";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/${property.region}/${property.slug}`}
      className="group block"
    >
      <div className="overflow-hidden aspect-[4/3] relative bg-[var(--beige)]">
        <Image
          src={property.cardImage}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] group-hover:text-[var(--warm-brown)] transition-colors">
            {property.name}
          </h3>
        </div>
        <p className="text-sm text-[var(--charcoal)]/60 mt-1 mb-4">
          {property.location}
        </p>
        <p className="text-sm text-[var(--charcoal)]/75 leading-relaxed line-clamp-2">
          {property.shortDescription}
        </p>
        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--charcoal)]/50">
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {property.guests} ospiti
          </span>
          <span className="flex items-center gap-1.5">
            <Bed size={13} />
            {property.bedrooms} camere
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} />
            {property.bathrooms} bagni
          </span>
        </div>
      </div>
    </Link>
  );
}

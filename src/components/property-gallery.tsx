import Image from "next/image";

export function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden bg-[var(--beige)]"
        >
          <Image
            src={src}
            alt={`${name} — foto ${i + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}
    </div>
  );
}

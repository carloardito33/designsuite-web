import fs from "node:fs";
import path from "node:path";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function getGallery(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/images/${slug}/${encodeURIComponent(f)}`);
}

export function getCoverImage(slug: string): string | null {
  return getGallery(slug)[0] ?? null;
}

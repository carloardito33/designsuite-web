import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

const SITE = "https://www.designsuite.it";

// Pagine pubbliche nelle due lingue (italiano senza prefisso, inglese sotto /en).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/prenota",
    ...properties.map((p) => `/${p.region}/${p.slug}`),
    "/privacy-policy",
    "/termini-e-condizioni",
  ];
  return pages.map((path) => {
    const it = SITE + (path === "/" ? "" : path);
    const en = SITE + (path === "/" ? "/en" : `/en${path}`);
    const isProperty = path.split("/").length === 3;
    return {
      url: it,
      changeFrequency: isProperty ? "weekly" : "monthly",
      priority: path === "/" ? 1 : isProperty ? 0.9 : 0.3,
      alternates: { languages: { it, en } },
    };
  });
}

import type { MetadataRoute } from "next";

// Area riservata, check in e guide ospiti non vanno nei motori di ricerca.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gestione", "/api/", "/checkin/", "/ospiti/", "/info/", "/en/info/"],
    },
    sitemap: "https://www.designsuite.it/sitemap.xml",
  };
}

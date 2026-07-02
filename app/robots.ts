import type { MetadataRoute } from "next";

const BASE_URL = "https://www.clanconnect.ai";

// Emit robots.txt as a static file at build time (required by output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/package/orders/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

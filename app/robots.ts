import type { MetadataRoute } from "next";

const BASE_URL = "https://www.clanconnect.ai";

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

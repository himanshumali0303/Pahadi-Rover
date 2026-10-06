import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Only linked once the real domain is configured.
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
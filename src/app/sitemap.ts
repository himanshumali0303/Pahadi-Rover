import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  // The sitemap is only generated once the owner configures the real domain,
  // so search engines never see a placeholder origin.
  if (!base) return [];
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/cafe`, lastModified: new Date() },
    { url: `${base}/cafe/menu`, lastModified: new Date() },
    { url: `${base}/rooms`, lastModified: new Date() },
    { url: `${base}/gallery`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
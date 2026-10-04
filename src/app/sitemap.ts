import type { MetadataRoute } from "next";
import { CRAFTS } from "./crafts/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...CRAFTS.map((craft) => ({
      url: `${SITE_URL}/crafts/${craft.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

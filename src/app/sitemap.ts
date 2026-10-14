import type { MetadataRoute } from "next";
import { CRAFTS } from "./crafts/data";
import { POSTS } from "./blog/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...CRAFTS.map((craft) => ({
      url: `${SITE_URL}/crafts/${craft.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

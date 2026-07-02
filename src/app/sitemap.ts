import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** Single-page site — the root plus in-page sections share one URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

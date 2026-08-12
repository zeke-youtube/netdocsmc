import type { MetadataRoute } from "next";
import { apiEntries } from "@/lib/docs";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    ...apiEntries.map((entry) => ({ url: `${siteUrl}/api/${entry.slug}/` })),
  ];
}

import { MetadataRoute } from "next";
import { type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"]; // idiomas suportados

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const now = new Date();

  return langs.map((lang) => ({
    url: `${baseUrl}/${lang}/sitemap.xml`,
    lastModified: now,
  }));
}

import { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";

const baseUrl = "https://portfoliosergiosantos.vercel.app";

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const now = new Date();

  // No Next.js, sitemaps gerados dinamicamente no App Router 
  // costumam ser acessados via /sitemap.xml/0, /sitemap.xml/1, etc.
  // ou simplesmente concentrados em /sitemap.xml.
  
  // Se você optar por manter o index, certifique-se de que o Google 
  // consiga encontrar os sitemaps individuais.
  return i18n.locales.map((lang) => ({
    url: `${baseUrl}/sitemap.xml?lang=${lang}`, // Passando lang como query para o sitemap.ts lidar
    lastModified: now,
  }));
}

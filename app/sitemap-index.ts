// app/sitemap-index.ts
import { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n"; // Usamos a configuração central de i18n

const baseUrl = "https://portfoliosergiosantos.vercel.app";

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const now = new Date();

  // Mapeia os idiomas registrados no seu projeto
  return i18n.locales.map((lang) => ({
    url: `${baseUrl}/${lang}/sitemap.xml`, // Certifique-se que essa rota existe!
    lastModified: now,
  }));
}

import { MetadataRoute } from "next";
import { type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"]; // idiomas suportados

export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const now = new Date();

  return langs.map((lang) => ({
    url: `${baseUrl}/${lang}/sitemap.xml`,
    lastModified: now,
    // Aqui aplicamos prioridade diferenciada:
    // Home recebe prioridade maior (1.0), páginas internas recebem menor (0.8)
    // Isso é apenas indicativo para buscadores, não obrigatório
    alternates: {
      languages: Object.fromEntries(
        langs.map((l) => [
          l === "pt" ? "pt-BR" : l === "en" ? "en-US" : "es-ES",
          `${baseUrl}/${l}/sitemap.xml`,
        ])
      ),
    },
  }));
}

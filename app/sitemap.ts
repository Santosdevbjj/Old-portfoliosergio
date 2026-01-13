import { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";

const baseUrl = "https://portfoliosergiosantos.vercel.app"; 
const locales = i18n.locales;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Páginas Principais (Home)
  // Como agora o conteúdo principal está na raiz de cada idioma
  for (const lang of locales) {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": `${baseUrl}/pt`,
          "en-US": `${baseUrl}/en`,
          "es-ES": `${baseUrl}/es`,
        },
      },
    });
  }

  /**
   * NOTA: Se você tiver páginas de projetos individuais carregadas via slug,
   * você deve buscar os slugs do GitHub ou MDX aqui e dar o push no array 'routes'.
   * Se os seus projetos apenas abrem o link externo do GitHub (como no ProjectCard),
   * eles NÃO devem estar no seu sitemap, pois o sitemap lista apenas as suas URLs internas.
   */

  return routes;
}

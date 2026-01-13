import { MetadataRoute } from "next"; 
import { getAllProjects, type Lang } from "@/lib/mdx";
import { i18n } from "@/lib/i18n";

const baseUrl = "https://portfoliosergiosantos.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const locales = i18n.locales as Lang[];

  // 1. Gerar rotas para Páginas Estáticas em todos os idiomas
  const staticPaths = ["", "/about", "/projects", "/projects/list"];

  for (const lang of locales) {
    for (const path of staticPaths) {
      routes.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1.0 : 0.8,
      });
    }
  }

  // 2. Gerar rotas para Projetos MDX em todos os idiomas
  // Usamos Promise.all para performance, buscando projetos de todos os idiomas simultaneamente
  const projectPromises = locales.map(async (lang) => {
    const projects = await getAllProjects(lang);
    return projects.map((project) => ({
      url: `${baseUrl}/${lang}/projects/${project.slug}`,
      lastModified: project.metadata.date ? new Date(project.metadata.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  });

  const allProjects = (await Promise.all(projectPromises)).flat();

  return [...routes, ...allProjects];
}

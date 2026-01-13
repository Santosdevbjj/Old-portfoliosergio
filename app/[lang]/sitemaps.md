import { MetadataRoute } from "next";
import { getAllProjects, type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app"; // ajuste para seu domínio real
const lang: Lang = "pt"; // este arquivo é para PT

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Páginas principais com prioridade maior
  const staticPaths = ["/", "/about", "/projects", "/projects/list", "/contact"];

  for (const path of staticPaths) {
    routes.push({
      url: `${baseUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1.0 : 0.9, // Home com maior prioridade
    });
  }

  // Páginas dinâmicas de projetos com prioridade menor
  const projects = await getAllProjects(lang);
  for (const project of projects) {
    routes.push({
      url: `${baseUrl}/${lang}/projects/${project.slug}`,
      lastModified: project.metadata.date
        ? new Date(project.metadata.date)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.7, // projetos com prioridade menor
    });
  }

  return routes;
}

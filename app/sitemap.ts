import { MetadataRoute } from "next";
import { getAllProjects, type Lang } from "@/lib/mdx";

const baseUrl = "https://seusite.com"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Páginas principais (Home, About, Projects Index, Contact)
  const staticPaths = ["/", "/about", "/projects", "/projects/list", "/contact"];

  langs.forEach((lang) => {
    staticPaths.forEach((path) => {
      routes.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.8,
      });
    });
  });

  // Páginas dinâmicas de projetos
  for (const lang of langs) {
    const projects = await getAllProjects(lang);
    projects.forEach((project) => {
      routes.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: project.metadata.date
          ? new Date(project.metadata.date)
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  }

  return routes;
}

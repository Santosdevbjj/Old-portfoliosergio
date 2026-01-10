import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type Lang = "pt" | "en" | "es";

export interface ProjectFrontmatter {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  slug: string;
}

export interface ProjectData {
  slug: string;
  lang: Lang;
  content: string;
  metadata: ProjectFrontmatter;
}

const MDX_PATH = path.join(process.cwd(), "mdx");

function getProjectPath(lang: Lang, slug: string) {
  return path.join(MDX_PATH, lang, `${slug}.mdx`);
}

/**
 * Lê um projeto por slug e idioma.
 * Se não existir no idioma solicitado, faz fallback para EN.
 */
export async function getProjectBySlug(
  slug: string,
  lang: Lang
): Promise<ProjectData | null> {
  try {
    const filePath = getProjectPath(lang, slug);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      lang,
      content,
      metadata: data as ProjectFrontmatter,
    };
  } catch {
    // Fallback: tenta EN se não encontrar no idioma solicitado
    if (lang !== "en") {
      try {
        const fallbackPath = getProjectPath("en", slug);
        const fileContent = await fs.readFile(fallbackPath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug,
          lang: "en",
          content,
          metadata: data as ProjectFrontmatter,
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Lista todos os slugs de um idioma.
 * ⚡ Otimização: uso de cache() para evitar leituras repetidas em cenários com muitos projetos.
 */
export const listSlugsByLang = cache(async (lang: Lang): Promise<string[]> => {
  const dir = path.join(MDX_PATH, lang);
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map((e) => e.name.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
});

/**
 * Retorna todos os projetos de um idioma.
 * Útil para páginas de índice ou listagem de cards.
 */
export async function getAllProjects(lang: Lang): Promise<ProjectData[]> {
  const slugs = await listSlugsByLang(lang);
  const projects = await Promise.all(
    slugs.map(async (slug) => await getProjectBySlug(slug, lang))
  );
  return projects.filter((p): p is ProjectData => p !== null);
}

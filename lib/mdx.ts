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
  slug?: string;
  featured?: boolean; // Adicionado para destacar projetos no futuro
}

export interface ProjectData {
  slug: string;
  lang: Lang;
  content: string;
  metadata: ProjectFrontmatter;
}

const MDX_ROOT = path.join(process.cwd(), "mdx");

/**
 * Retorna o caminho absoluto de um arquivo MDX
 */
function getProjectPath(lang: Lang, slug: string) {
  return path.join(MDX_ROOT, lang, `${slug}.mdx`);
}

/**
 * Normaliza e valida o frontmatter
 */
function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string
): ProjectFrontmatter {
  return {
    title: String(data.title || slug),
    date: typeof data.date === "string" ? data.date : undefined,
    description: typeof data.description === "string" ? data.description : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    slug,
    featured: Boolean(data.featured),
  };
}

/**
 * Lê e processa um arquivo MDX específico com tratamento de erro granular
 */
async function readMdxFile(
  lang: Lang,
  slug: string
): Promise<ProjectData | null> {
  const filePath = getProjectPath(lang, slug);

  try {
    // Verifica se o arquivo existe antes de tentar ler (evita throws desnecessários)
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) return null;

    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    // Se o conteúdo estiver vazio e não houver frontmatter, ignora
    if (!content && Object.keys(data).length === 0) return null;

    return {
      slug,
      lang,
      content,
      metadata: normalizeFrontmatter(data, slug),
    };
  } catch (error) {
    // Log apenas em desenvolvimento para não poluir o log de produção
    if (process.env.NODE_ENV === "development") {
      console.warn(`[MDX] Arquivo não encontrado ou inválido: ${lang}/${slug}`);
    }
    return null;
  }
}

/**
 * Lê um projeto por slug e idioma.
 * ⚡ Cacheado no nível da requisição pelo React
 */
export const getProjectBySlug = cache(
  async (slug: string, lang: Lang): Promise<ProjectData | null> => {
    const project = await readMdxFile(lang, slug);
    if (project) return project;

    // Fallback inteligente: Se não achou em PT ou ES, tenta EN
    if (lang !== "en") {
      return await readMdxFile("en", slug);
    }

    return null;
  }
);

/**
 * Lista todos os slugs disponíveis para um idioma.
 */
export const listSlugsByLang = cache(
  async (lang: Lang): Promise<string[]> => {
    const dir = path.join(MDX_ROOT, lang);

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      return entries
        .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
        .map((e) => e.name.replace(/\.mdx$/, ""));
    } catch {
      return [];
    }
  }
);

/**
 * Retorna todos os projetos de um idioma de forma eficiente.
 */
export async function getAllProjects(lang: Lang): Promise<ProjectData[]> {
  const slugs = await listSlugsByLang(lang);

  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug, lang))
  );

  return projects
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => {
      // Ordenação segura por data (decrescente)
      const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
      const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
      return dateB - dateA;
    });
}

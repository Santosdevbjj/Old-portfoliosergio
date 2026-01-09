// lib/github.ts

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language?: string;
  stargazers_count?: number;
  updated_at?: string;
};

const DEFAULT_USER = "Santosdevbjj";

/**
 * Categorias fixas para organizar os repositórios
 * Alinhadas com as chaves usadas em i18n.ts (projectCategories)
 */
export const CATEGORIES_ORDER = [
  "data-science",
  "azure-databricks",
  "neo4j",
  "power-bi",
  "database",
  "python",
  "csharp",
  "dotnet",
  "java",
  "machine-learning",
  "amazon-aws",
  "cybersecurity",
  "programming-logic",
  "html",
  "articles-repo",
] as const;

export type Category = (typeof CATEGORIES_ORDER)[number];

/**
 * Busca e categoriza repositórios do GitHub
 */
export async function getPortfolioRepos(
  user: string = DEFAULT_USER,
  mainTopic: string = "portfolio"
): Promise<Record<Category, GitHubRepo[]>> {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 }, // cache de 1 hora
    });

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return {} as Record<Category, GitHubRepo[]>;
    }

    const repos: GitHubRepo[] = await res.json();

    // Filtra apenas repositórios com o tópico principal
    const portfolioRepos = repos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
    );

    // Categoriza conforme ordem fixa
    const categorized: Record<Category, GitHubRepo[]> = {} as Record<Category, GitHubRepo[]>;

    CATEGORIES_ORDER.forEach((cat) => {
      categorized[cat] = portfolioRepos
        .filter((r) => r.topics?.includes(cat))
        .map((r) => ({
          ...r,
          description: r.description ?? "",
          topics: r.topics ?? [],
          language: r.language ?? undefined,
          stargazers_count: r.stargazers_count ?? 0,
          updated_at: r.updated_at ?? undefined,
        }))
        .sort((a, b) => {
          const dateA = a.updated_at ? Date.parse(a.updated_at) : 0;
          const dateB = b.updated_at ? Date.parse(b.updated_at) : 0;
          return dateB - dateA; // mais recentes primeiro
        });
    });

    return categorized;
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return {} as Record<Category, GitHubRepo[]>;
  }
}

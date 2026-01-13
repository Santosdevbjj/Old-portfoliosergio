// lib/github.ts

/* ----------------------------- Types ----------------------------- */

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language?: string;
  stargazers_count: number;
  updated_at?: string;
};

const DEFAULT_USER = "Santosdevbjj";

/**
 * Categorias canônicas
 * (100% alinhadas com i18n.projectCategories)
 */
export const CATEGORIES_ORDER = [
  "dataScience",
  "azureDatabricks",
  "neo4j",
  "powerBI",
  "database",
  "python",
  "dotnet",
  "java",
  "machineLearning",
  "aws",
  "cybersecurity",
  "logic",
  "html",
  "articlesRepo",
] as const;

export type CategoryKey = (typeof CATEGORIES_ORDER)[number];

/* ----------------------- Topic Aliases --------------------------- */
/**
 * Mapeia TODOS os tópicos reais do GitHub
 * para uma categoria canônica
 */
const TOPIC_ALIASES: Record<CategoryKey, string[]> = {
  dataScience: [
    "data-science",
    "ciencia-de-dados",
    "data-analysis",
    "analise-de-dados",
  ],
  azureDatabricks: [
    "azure-databricks",
    "databricks",
    "azure",
    "azure-cloud",
  ],
  neo4j: [
    "neo4j",
    "graph-analysis",
    "analise-de-grafos",
  ],
  powerBI: [
    "power-bi",
    "powerbi",
    "business-intelligence",
    "data-analysis",
    "analise-de-dados",
  ],
  database: [
    "database",
    "banco-de-dados",
    "sql",
  ],
  python: [
    "python",
  ],
  dotnet: [
    "dotnet",
    "csharp",
  ],
  java: [
    "java",
  ],
  machineLearning: [
    "machine-learning",
  ],
  aws: [
    "aws",
    "amazon-aws",
  ],
  cybersecurity: [
    "cybersecurity",
    "ciberseguranca",
  ],
  logic: [
    "programming-logic",
    "logica-de-programacao",
  ],
  html: [
    "html",
    "frontend",
  ],
  articlesRepo: [
    "articles",
    "artigos-tecnicos",
  ],
};

/* ------------------------ Fetch Repos ----------------------------- */

/**
 * Busca repositórios do GitHub marcados como parte do portfólio
 */
export async function getPortfolioRepos(
  user: string = DEFAULT_USER,
  mainTopic: string = "portfolio"
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status, res.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter(
        (repo) =>
          Array.isArray(repo.topics) &&
          repo.topics.includes(mainTopic)
      )
      .map((repo) => ({
        ...repo,
        description: repo.description ?? null,
        topics: repo.topics ?? [],
        stargazers_count: repo.stargazers_count ?? 0,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

/* --------------------- Categorize Repos --------------------------- */

/**
 * Organiza repositórios por categoria canônica
 */
export function categorizeRepos(
  repos: GitHubRepo[]
): Record<CategoryKey, GitHubRepo[]> {
  const categorized = {} as Record<CategoryKey, GitHubRepo[]>;

  CATEGORIES_ORDER.forEach((category) => {
    const aliases = TOPIC_ALIASES[category];

    categorized[category] = repos
      .filter((repo) =>
        repo.topics.some((topic) => aliases.includes(topic))
      )
      .sort((a, b) => {
        const dateA = a.updated_at ? Date.parse(a.updated_at) : 0;
        const dateB = b.updated_at ? Date.parse(b.updated_at) : 0;
        return dateB - dateA;
      });
  });

  return categorized;
}

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

/* ----------------------------- Categorias ----------------------------- */

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

const TOPIC_ALIASES: Record<CategoryKey, string[]> = {
  dataScience: ["data-science", "ciencia-de-dados", "data-analysis", "analise-de-dados"],
  azureDatabricks: ["azure", "azure-cloud", "databricks", "azure-databricks"],
  neo4j: ["neo4j", "graph-analysis", "analise-de-grafos"],
  powerBI: ["power-bi", "powerbi", "business-intelligence", "data-analysis", "analise-de-dados"],
  database: ["database", "banco-de-dados", "sql"],
  python: ["python"],
  dotnet: ["dotnet", "csharp"],
  java: ["java"],
  machineLearning: ["machine-learning"],
  aws: ["aws", "amazon-aws"],
  cybersecurity: ["cybersecurity", "ciberseguranca"],
  logic: ["programming-logic", "logica-de-programacao"],
  html: ["html", "frontend"],
  articlesRepo: ["articles", "artigos-tecnicos", "articles-repo"],
};

/* ------------------------ Fetch & Categorize ----------------------------- */

export async function getPortfolioRepos(
  user: string = DEFAULT_USER,
  mainTopic: string = "portfolio"
): Promise<Record<CategoryKey, GitHubRepo[]>> {

  // Inicializa objeto categorizado
  const categorized = {} as Record<CategoryKey, GitHubRepo[]>;
  CATEGORIES_ORDER.forEach(key => categorized[key] = []);

  try {
    const token = process.env.GITHUB_ACCESS_TOKEN;

    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      {
        headers: {
          "Accept": "application/vnd.github+json",
          ...(token ? { "Authorization": `token ${token}` } : {}),
          "User-Agent": "Portfolio-Sergio-Santos"
        },
        ...(typeof window === "undefined" ? { next: { revalidate: 3600, tags: ['github-repos'] } } : {})
      }
    );

    if (!res.ok) {
      console.warn(`[GitHub API] Status: ${res.status}. Verifique o GITHUB_ACCESS_TOKEN na Vercel.`);
      return categorized;
    }

    const allRepos: any[] = await res.json();
    if (!Array.isArray(allRepos)) return categorized;

    // Filtra apenas projetos com o tópico principal "portfolio"
    const portfolioRepos = allRepos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
    );

    portfolioRepos.forEach((repo) => {
      const repoTopics: string[] = Array.isArray(repo.topics)
        ? repo.topics.map((t: any) => String(t).toLowerCase())
        : [];

      for (const key of CATEGORIES_ORDER) {
        const aliases = TOPIC_ALIASES[key];
        if (repoTopics.some(topic => aliases.includes(topic))) {
          categorized[key].push({
            id: Number(repo.id),
            name: String(repo.name),
            description: repo.description ?? null,
            html_url: String(repo.html_url),
            topics: repoTopics,
            language: repo.language ? String(repo.language) : undefined,
            stargazers_count: Number(repo.stargazers_count ?? 0),
            updated_at: repo.updated_at ? String(repo.updated_at) : undefined,
          });
          break; // Evita múltiplas categorias
        }
      }
    });

    // Ordena cada categoria pelo mais recente (updated_at)
    for (const key of CATEGORIES_ORDER) {
      categorized[key].sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA; // do mais recente para o mais antigo
      });
    }

    return categorized;

  } catch (error) {
    console.error("Critical error fetching GitHub repos:", error);
    return categorized;
  }
}

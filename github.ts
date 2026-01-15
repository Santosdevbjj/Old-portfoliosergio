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
 * 1. Categorias canônicas (Exatamente na ordem definida)
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

const TOPIC_ALIASES: Record<CategoryKey, string[]> = {
  dataScience: ["data-science", "ciencia-de-dados", "data-analysis", "analise-de-dados"],
  azureDatabricks: ["azure-databricks", "databricks", "azure", "azure-cloud"],
  neo4j: ["neo4j", "graph-analysis", "analise-de-grafos"],
  powerBI: ["power-bi", "powerbi", "business-intelligence"],
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
  
  // Melhoria 1: Redução mais limpa para inicializar o objeto
  const categorized = {} as Record<CategoryKey, GitHubRepo[]>;
  CATEGORIES_ORDER.forEach(key => categorized[key] = []);

  try {
    // Melhoria 2: Validação do Token (O nome bate exatamente com a sua Vercel)
    const token = process.env.GITHUB_ACCESS_TOKEN;
    
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      {
        headers: {
          "Accept": "application/vnd.github+json",
          ...(token ? { "Authorization": `token ${token}` } : {}), // Padrão 'token' para PATs
          "User-Agent": "Portfolio-Sergio-Santos"
        },
        // Melhoria 3: Tags para permitir revalidação sob demanda se necessário
        next: { revalidate: 3600, tags: ['github-repos'] }, 
      }
    );

    if (!res.ok) {
      // Se o erro for 401 ou 403, é problema no token
      console.warn(`[GitHub API] Status: ${res.status}. Verifique o GITHUB_ACCESS_TOKEN na Vercel.`);
      return categorized;
    }

    const allRepos: GitHubRepo[] = await res.json();

    if (!Array.isArray(allRepos)) return categorized;

    const portfolioRepos = allRepos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
    );

    portfolioRepos.forEach((repo) => {
      const repoTopics = repo.topics.map(t => t.toLowerCase());
      
      for (const key of CATEGORIES_ORDER) {
        const aliases = TOPIC_ALIASES[key];
        
        if (repoTopics.some((topic) => aliases.includes(topic))) {
          categorized[key].push({
            id: repo.id,
            name: repo.name,
            description: repo.description ?? null,
            html_url: repo.html_url,
            topics: repo.topics ?? [],
            language: repo.language,
            stargazers_count: repo.stargazers_count ?? 0,
            updated_at: repo.updated_at
          });
          break; 
        }
      }
    });

    return categorized;
  } catch (error) {
    console.error("Critical error fetching GitHub repos:", error);
    return categorized;
  }
}

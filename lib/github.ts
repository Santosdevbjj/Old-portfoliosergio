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

// Mapeamento dos tópicos do GitHub para as categorias do site
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

/**
 * Busca e categoriza repositórios do GitHub com base em tópicos.
 * Implementa cache de 1 hora para otimização de performance.
 */
export async function getPortfolioRepos(
  user: string = DEFAULT_USER,
  mainTopic: string = "portfolio"
): Promise<Record<CategoryKey, GitHubRepo[]>> {
  // Inicializa o objeto com arrays vazios para evitar erros de undefined no frontend
  const categorized: Record<CategoryKey, GitHubRepo[]> = CATEGORIES_ORDER.reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {} as Record<CategoryKey, GitHubRepo[]>
  );

  try {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    
    // Configuração do fetch com cache e headers oficiais
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "User-Agent": "Portfolio-Sergio-Santos" // Requisito da API do GitHub
        },
        next: { revalidate: 3600 }, // Cache de 1 hora no Next.js
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API responded with ${res.status}: ${res.statusText}`);
      return categorized;
    }

    const allRepos: GitHubRepo[] = await res.json();

    // 1. Filtra repositórios marcados com 'portfolio'
    const portfolioRepos = allRepos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
    );

    // 2. Distribui os repositórios nas categorias conforme a prioridade da CATEGORIES_ORDER
    portfolioRepos.forEach((repo) => {
      const repoTopics = repo.topics.map(t => t.toLowerCase());
      
      for (const key of CATEGORIES_ORDER) {
        const aliases = TOPIC_ALIASES[key];
        
        // Verifica se algum tópico do repo bate com os aliases da categoria
        if (repoTopics.some((topic) => aliases.includes(topic))) {
          categorized[key].push({
            ...repo,
            description: repo.description ?? null,
            topics: repo.topics ?? [],
            stargazers_count: repo.stargazers_count ?? 0,
          });
          // Break garante que o projeto apareça apenas na categoria de maior prioridade
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

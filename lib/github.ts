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
 * 1. Categorias canônicas (Exatamente na ordem que você pediu)
 */
export const CATEGORIES_ORDER = [
  "dataScience",      // 1) Ciência de Dados
  "azureDatabricks",  // 2) Azure Databricks
  "neo4j",            // 3) Neo4J
  "powerBI",          // 4) Power BI e Análise de dados
  "database",         // 5) Banco de Dados
  "python",           // 6) Python
  "dotnet",           // 7) C#/dotnet
  "java",             // 8) Java
  "machineLearning",  // 9) Machine Learning
  "aws",              // 10) Amazon AWS
  "cybersecurity",    // 11) Cibersegurança
  "logic",            // 12) Lógica de Programação
  "html",             // 13) HTML
  "articlesRepo",     // 14) Repositório de Artigos Técnicos
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
  try {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      {
        headers: { 
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return {} as Record<CategoryKey, GitHubRepo[]>;

    const allRepos: GitHubRepo[] = await res.json();

    // Filtra apenas quem tem a tag 'portfolio'
    const portfolioRepos = allRepos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(mainTopic)
    );

    // Inicializa o objeto de retorno
    const categorized = {} as Record<CategoryKey, GitHubRepo[]>;
    CATEGORIES_ORDER.forEach((cat) => (categorized[cat] = []));

    // Distribui os repositórios nas categorias
    portfolioRepos.forEach((repo) => {
      for (const key of CATEGORIES_ORDER) {
        const aliases = TOPIC_ALIASES[key];
        if (repo.topics.some((topic) => aliases.includes(topic.toLowerCase()))) {
          categorized[key].push({
            ...repo,
            description: repo.description ?? null,
            topics: repo.topics ?? [],
            stargazers_count: repo.stargazers_count ?? 0,
          });
          break; // Um repo só aparece na primeira categoria que der match
        }
      }
    });

    return categorized;
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return {} as Record<CategoryKey, GitHubRepo[]>;
  }
}

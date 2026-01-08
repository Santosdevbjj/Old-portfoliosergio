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
 * Monta a URL da API do GitHub para buscar repositórios de um usuário
 */
function buildApiUrl(user: string): string {
  return `https://api.github.com/users/${user}/repos?per_page=100`;
}

/**
 * Busca repositórios públicos do GitHub marcados como "portfolio"
 * - Executa no servidor com cache (ISR)
 * - Trata rate limit e erros de API
 * - Ordena resultados por data de atualização (mais recentes primeiro)
 */
export async function getPortfolioRepos(
  user: string = DEFAULT_USER
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(buildApiUrl(user), {
      headers: {
        Accept: "application/vnd.github+json", // header atualizado
      },
      next: { revalidate: 3600 }, // cache de 1 hora
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.error("GitHub API rate limit exceeded. Tente novamente mais tarde.");
      } else {
        console.error("GitHub API error:", res.status, res.statusText);
      }
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter(
        (repo) =>
          Array.isArray(repo.topics) &&
          repo.topics.includes("portfolio")
      )
      .map((repo) => ({
        ...repo,
        description: repo.description ?? "",
        topics: repo.topics ?? [],
        language: repo.language ?? undefined,
        stargazers_count: repo.stargazers_count ?? 0,
        updated_at: repo.updated_at ?? undefined,
      }))
      .sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA; // mais recentes primeiro
      });
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

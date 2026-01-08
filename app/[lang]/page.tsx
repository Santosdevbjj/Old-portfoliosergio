import { notFound } from "next/navigation";
import { getPortfolioRepos, GitHubRepo } from "@/lib/github";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import ProjectSection from "../components/ProjectSection";

interface PageProps {
  params: { lang: string };
}

// Idiomas suportados
const SUPPORTED_LANGS = ["pt", "en"] as const;

export default async function Page({ params }: PageProps) {
  const { lang } = params;

  // 🔐 Bloqueia idiomas inválidos
  if (!SUPPORTED_LANGS.includes(lang as any)) {
    notFound();
  }

  // ✅ Execução 100% server-side
  const [repos, dict] = await Promise.all([
    getPortfolioRepos(),
    getDictionary(lang),
  ]);

  return (
    <section className="container mx-auto px-4 py-12 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">
          {dict.portfolio.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          {dict.portfolio.description}
        </p>
      </header>

      {TECHNOLOGY_ORDER.map((tech) => {
        const filteredRepos = repos.filter(
          (repo: GitHubRepo) => repo.topics?.includes(tech)
        );

        if (filteredRepos.length === 0) return null;

        return (
          <ProjectSection
            key={tech}
            title={
              dict.categories?.[tech] ??
              tech.replace(/-/g, " ").toUpperCase()
            }
            repos={filteredRepos}
          />
        );
      })}
    </section>
  );
}

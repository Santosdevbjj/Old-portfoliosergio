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

  if (!SUPPORTED_LANGS.includes(lang as any)) {
    notFound();
  }

  // Execução server-side segura
  const [repos, dict] = await Promise.all([
    getPortfolioRepos(),
    getDictionary(lang),
  ]);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header do Portfolio */}
      <header className="space-y-4 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-textGradient">
          {dict.portfolio.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto sm:mx-0 text-base sm:text-lg md:text-xl">
          {dict.portfolio.description}
        </p>
      </header>

      {/* Seções de Projetos por tecnologia */}
      {TECHNOLOGY_ORDER.map((tech) => {
        const filteredRepos = repos.filter(
          (repo: GitHubRepo) => repo.topics?.includes(tech)
        );

        if (!filteredRepos.length) return null;

        return (
          <ProjectSection
            key={tech}
            title={dict.categories?.[tech] ?? tech.replace(/-/g, " ").toUpperCase()}
            repos={filteredRepos}
          />
        );
      })}
    </section>
  );
}

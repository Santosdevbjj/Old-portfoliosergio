import { notFound } from "next/navigation";
import { getPortfolioRepos, GitHubRepo } from "@/lib/github";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import ProjectSection from "../components/ProjectSection";

interface PageProps {
  params: { lang: string };
}

const SUPPORTED_LANGS = ["pt", "en"] as const;

export default async function Page({ params }: PageProps) {
  const { lang } = params;

  if (!SUPPORTED_LANGS.includes(lang as any)) {
    notFound();
  }

  const [repos, dict] = await Promise.all([
    getPortfolioRepos(),
    getDictionary(lang),
  ]);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 sm:space-y-16">
      {/* Header da página */}
      <header className="space-y-4 max-w-3xl">
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-textGradient">
          {dict.portfolio.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {dict.portfolio.description}
        </p>
      </header>

      {/* Seções de projetos por tecnologia */}
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

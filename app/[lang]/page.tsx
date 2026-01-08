import { getPortfolioRepos } from "@/lib/github";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import ProjectSection from "../components/ProjectSection";

interface PageProps {
  params: { lang: string };
}

export default async function Page({ params: { lang } }: PageProps) {
  // Executa no servidor (seguro e rápido)
  const repos = await getPortfolioRepos();
  const dict = await getDictionary(lang);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{dict.portfolio.title}</h1>
      <p className="mb-8 text-gray-600">{dict.portfolio.description}</p>

      {TECHNOLOGY_ORDER.map((tech) => {
        const filteredRepos = repos.filter((r: any) => r.topics.includes(tech));
        if (filteredRepos.length === 0) return null;

        return (
          <ProjectSection
            key={tech}
            title={dict.categories?.[tech] || tech.replace("-", " ").toUpperCase()}
            repos={filteredRepos}
          />
        );
      })}
    </main>
  );
}

import { getPortfolioRepos } from "@/lib/github";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import ProjectSection from "../components/ProjectSection";

interface PageProps {
  params: {
    lang: string;
  };
}

// REMOVIDO "use client" - Esta página agora é um Server Component
export default async function Page({ params: { lang } }: PageProps) {
  // 1. Busca os repositórios (no servidor, muito mais rápido)
  const repos = await getPortfolioRepos();
  
  // 2. Busca o dicionário
  const dict = await getDictionary(lang);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{dict.portfolio.title}</h1>

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

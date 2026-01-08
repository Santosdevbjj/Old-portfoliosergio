"use client";
import { getPortfolioRepos } from "@/lib/github";
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n"; // Importação corrigida
import ProjectSection from "../components/ProjectSection";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function Page({ params: { lang } }: PageProps) {
  // 1. Busca os repositórios do GitHub
  const repos = await getPortfolioRepos();
  
  // 2. Busca o dicionário de traduções (resolve o erro do log)
  const dict = await getDictionary(lang);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Exemplo: Um título traduzido vindo do seu JSON */}
      <h1 className="text-3xl font-bold mb-8">{dict.portfolio.title}</h1>

      {TECHNOLOGY_ORDER.map((tech) => {
        const filteredRepos = repos.filter((r) => r.topics.includes(tech));
        
        // Só renderiza a seção se houver repositórios com essa tag
        if (filteredRepos.length === 0) return null;

        return (
          <ProjectSection
            key={tech}
            // Tenta buscar o nome da categoria traduzido, ou usa o nome da tag
            title={dict.categories?.[tech] || tech.replace("-", " ").toUpperCase()}
            repos={filteredRepos}
          />
        );
      })}
    </main>
  );
}

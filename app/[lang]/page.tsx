import { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import AboutSection from "@/components/AboutSection";
import { getDictionary } from "@/lib/i18n";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  CategoryKey,
  GitHubRepo,
} from "@/lib/github";

/**
 * CONFIGURAÇÕES DE CACHE - NEXT.JS 15
 * dynamic: force-static -> Garante que a página seja gerada no build (SSG).
 * revalidate: 3600 -> ISR: Tenta atualizar os dados do GitHub a cada 1 hora.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: "pt" | "en" | "es" }>;
}

/** * 🔎 METADADOS DINÂMICOS (SEO)
 * Gerados no servidor para cada idioma.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  
  return {
    title: `Sérgio Santos | ${t.navigation.home}`,
    description: t.portfolio.description,
    openGraph: {
      images: [`/og-image-${lang}.png`],
      type: "website",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);

  // Inicializa o objeto de repositórios para evitar quebras de renderização
  let repos: Record<CategoryKey, GitHubRepo[]> = CATEGORIES_ORDER.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as Record<CategoryKey, GitHubRepo[]>);

  try {
    const fetchedRepos = await getPortfolioRepos();
    if (fetchedRepos && Object.keys(fetchedRepos).length > 0) {
      repos = fetchedRepos as Record<CategoryKey, GitHubRepo[]>;
    }
  } catch (error) {
    // Log de erro no servidor (Vercel) para monitoramento
    console.error("Erro ao carregar repositórios do GitHub:", error);
  }

  const hasProjects = Object.values(repos).some(
    (projects) => projects && projects.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      {/* Componente Hero com suporte a múltiplos idiomas */}
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-32 pb-20 overflow-hidden">
        
        {/* Seção Sobre Profissional (MDX Content) */}
        <AboutSection locale={lang} />

        {/* Destaque Principal do Portfólio */}
        <FeaturedProject dict={t} />

        {/* Artigo em Destaque: Autoridade Técnica */}
        <section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
          aria-labelledby="featured-article-title"
        >
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* Grid Dinâmico de Projetos (GitHub API) */}
        <section 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
          aria-labelledby="projects-title"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 id="projects-title" className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <span role="img" aria-hidden="true" className="bg-blue-600 text-white p-2 rounded-xl text-2xl shadow-lg shadow-blue-500/20">
                  📂
                </span> 
                {t.sections.projectsTitle}
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
                {t.sections.projectsSubtitle || "Engenharia de dados, automação e arquitetura de software."}
              </p>
            </div>
          </div>

          {!hasProjects ? (
            /* Estado Vazio: Se o GitHub não retornar nada ou houver erro no Token */
            <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
              <p className="text-slate-500 text-lg italic">
                {t.sections.projectsEmpty}
              </p>
            </div>
          ) : (
            /* Renderização por Categorias Ordenadas */
            <div className="space-y-24">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                const categoryTitle = t.projectCategories[key];

                if (!projects || projects.length === 0) return null;

                return (
                  <ProjectsSection 
                    key={key}
                    title={categoryTitle || key}
                    projects={projects}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}

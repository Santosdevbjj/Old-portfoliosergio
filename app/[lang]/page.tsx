import { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import AboutSection from "@/components/AboutSection"; // Importando o novo componente
import { getDictionary } from "@/lib/i18n";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  CategoryKey,
  GitHubRepo,
} from "@/lib/github";

export const dynamic = "force-static";
export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: "pt" | "en" | "es" }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  
  return {
    title: `Sérgio Santos | ${t.sections.projectsTitle}`,
    description: t.portfolio.description,
    openGraph: {
      images: [`/og-image-${lang}.png`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = getDictionary(lang);

  let repos: Record<CategoryKey, GitHubRepo[]> = {} as Record<CategoryKey, GitHubRepo[]>;
  CATEGORIES_ORDER.forEach(key => {
    repos[key] = [];
  });

  try {
    const fetchedRepos = await getPortfolioRepos();
    if (fetchedRepos && Object.keys(fetchedRepos).length > 0) {
      repos = fetchedRepos as Record<CategoryKey, GitHubRepo[]>;
    }
  } catch (error) {
    console.error("Erro ao carregar repositórios do GitHub:", error);
  }

  const categoryMap: Record<CategoryKey, string> = {
    dataScience: t.projectCategories.dataScience,
    azureDatabricks: t.projectCategories.azureDatabricks,
    neo4j: t.projectCategories.neo4j,
    powerBI: t.projectCategories.powerBI,
    database: t.projectCategories.database,
    python: t.projectCategories.python,
    dotnet: t.projectCategories.dotnet,
    java: t.projectCategories.java,
    machineLearning: t.projectCategories.machineLearning,
    aws: t.projectCategories.aws,
    cybersecurity: t.projectCategories.cybersecurity,
    logic: t.projectCategories.logic,
    html: t.projectCategories.html,
    articlesRepo: t.projectCategories.articlesRepo,
  };

  const hasProjects = Object.values(repos).some(
    (projects) => projects && projects.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-24 pb-20">
        {/* Seção Sobre Profissional (Componente Centralizado) */}
        <AboutSection locale={lang} />

        <FeaturedProject dict={t} />

        <section className="max-w-7xl mx-auto px-4" aria-labelledby="featured-article-title">
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* Seção Dinâmica de Projetos (GitHub) */}
        <section className="max-w-7xl mx-auto px-4" aria-labelledby="projects-title">
          <h2 id="projects-title" className="text-3xl font-bold mb-12 flex items-center gap-3">
            <span className="bg-blue-600 text-white p-2 rounded-lg text-xl">📂</span> 
            {t.sections.projectsTitle}
          </h2>

          {!hasProjects ? (
            <div className="py-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-slate-500 text-lg italic">
                {t.sections.projectsEmpty || "Carregando projetos do GitHub..."}
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                if (!projects || projects.length === 0) return null;

                return (
                  <ProjectsSection 
                    key={key}
                    title={categoryMap[key] || "Outros"}
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

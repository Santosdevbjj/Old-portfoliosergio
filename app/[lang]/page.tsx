// app/[lang]/page.tsx
import PageWrapper from "@/components/PageWrapper";
import HeroSection from "@/components/HeroSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectSection from "@/components/ProjectSection";
import FeaturedArticleSection from "@/components/FeaturedArticleSection";
import { getDictionary } from "@/lib/i18n";
import { getPortfolioRepos, Category, CATEGORIES_ORDER, GitHubRepo } from "@/lib/github";

interface Props {
  params: { lang: "pt" | "en" | "es" };
}

export default async function Page({ params }: Props) {
  // Usando a função padronizada que criamos
  const t = getDictionary(params.lang);
  const repos = await getPortfolioRepos();

  const categoryMap: Record<Category, string> = {
    "data-science": t.projectCategories.dataScience,
    "azure-databricks": t.projectCategories.azureDatabricks,
    "neo4j": t.projectCategories.neo4j,
    "power-bi": t.projectCategories.powerBI,
    "database": t.projectCategories.database,
    "python": t.projectCategories.python,
    "csharp": t.projectCategories.dotnet,
    "dotnet": t.projectCategories.dotnet,
    "java": t.projectCategories.java,
    "machine-learning": t.projectCategories.machineLearning,
    "amazon-aws": t.projectCategories.aws,
    "cybersecurity": t.projectCategories.cybersecurity,
    "programming-logic": t.projectCategories.logic,
    "html": t.projectCategories.html,
    "articles-repo": t.projectCategories.articlesRepo,
  };

  return (
    <PageWrapper lang={params.lang}>
      {/* 1. SEÇÃO DE IMPACTO INICIAL */}
      <HeroSection dict={t} />

      <main role="main" className="space-y-24 pb-20">
        
        {/* 2. CASE DE SUCESSO (Storytelling de Dados) */}
        <FeaturedProject dict={t} />

        {/* 3. ARTIGO PREMIADO */}
        <section className="max-w-7xl mx-auto px-4" aria-labelledby="featured-article-title">
          <FeaturedArticleSection dict={t.sections} article={t.featuredArticle} />
        </section>

        {/* 4. EXPERIÊNCIA TÉCNICA (Resumo do CV) */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12" aria-labelledby="experience-title">
          <div>
            <h2 id="experience-title" className="text-3xl font-bold mb-6 border-b-2 border-blue-600 pb-2 w-fit">
              {t.sections.experienceTitle}
            </h2>
            <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
              <li className="flex gap-2"><span>✅</span> {t.experience.item1}</li>
              <li className="flex gap-2"><span>✅</span> {t.experience.item2}</li>
              <li className="flex gap-2"><span>✅</span> {t.experience.item3}</li>
            </ul>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 uppercase text-sm tracking-wider">Skills Overview</h3>
            <p className="text-base">
              <strong>{t.sections.stackConsolidated}:</strong> <br/>
              <span className="text-slate-500">{t.experience.stackConsolidated}</span>
            </p>
            <p className="text-base">
              <strong>{t.sections.stackUpdating}:</strong> <br/>
              <span className="text-slate-500">{t.experience.stackUpdating}</span>
            </p>
          </div>
        </section>

        {/* 5. LISTA GERAL DE PROJETOS (GITHUB) */}
        <section className="max-w-7xl mx-auto px-4" aria-labelledby="projects-title">
          <h2 id="projects-title" className="text-3xl font-bold mb-8">
            📂 {t.sections.projectsTitle}
          </h2>
          <div className="space-y-12">
            {(Object.entries(repos) as [Category, GitHubRepo[]][])
              .sort(([a], [b]) => CATEGORIES_ORDER.indexOf(a) - CATEGORIES_ORDER.indexOf(b))
              .map(([cat, projects]) => (
                <ProjectSection
                  key={cat}
                  title={categoryMap[cat] || t.projectCategories.unknown}
                  projects={projects}
                />
              ))}
          </div>
        </section>

      </main>
    </PageWrapper>
  );
}

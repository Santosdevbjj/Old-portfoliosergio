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
  type GitHubRepo,
} from "@/lib/github";

// Next.js 15 ISR: Revalida o cache a cada 1 hora
export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: "pt" | "en" | "es" }>;
}

/** 🔎 SEO DINÂMICO Sincronizado com o novo Dictionary */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang); // Note o 'await' se for async
  
  return {
    title: `${t.portfolio.title} | Data Engineer`,
    description: t.portfolio.description,
    openGraph: {
      title: `${t.portfolio.title} | Data Engineer`,
      description: t.portfolio.description,
      images: [`/og-image-${lang}.png`],
      type: "website",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  // Busca de repositórios
  let repos: Record<string, GitHubRepo[]> = {};
  try {
    repos = await getPortfolioRepos();
  } catch (error) {
    console.error("GitHub API Error:", error);
  }

  const hasProjects = Object.values(repos).some(
    (categoryList) => categoryList && categoryList.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      {/* Hero: Identidade Visual e Call to Action principal */}
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-24 md:space-y-32 pb-20">
        
        {/* Seção About: Experiência Bancária e Visão Técnica */}
        <section id="about" className="scroll-mt-24">
           <AboutSection locale={lang} />
        </section>

        {/* Case de Sucesso: Renderizado apenas se houver dados no dict */}
        <section id="featured-case" className="bg-slate-50 dark:bg-slate-900/30 py-16 md:py-24">
          <FeaturedProject dict={t} />
        </section>

        {/* Autoridade: O Artigo Premiado (DIO Winner) */}
        <section 
          id="awards"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" 
          aria-labelledby="awards-title"
        >
          <div className="text-center mb-12">
            <h2 id="awards-title" className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.sections.awards}
            </h2>
          </div>
          <FeaturedArticleSection 
             dict={t.sections} 
             article={t.portfolio.featured_article} 
          />
        </section>

        {/* Portfólio Dinâmico do GitHub */}
        <section 
          id="featuredProjects"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24" 
          aria-labelledby="projects-title"
        >
          <div className="text-center md:text-left mb-16 border-l-8 border-blue-600 pl-6">
             <h2 id="projects-title" className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.sections.featuredProjects}
             </h2>
             <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
                {t.portfolio.description}
             </p>
          </div>

          {!hasProjects ? (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/10 transition-all">
              <p className="text-slate-400 text-lg font-medium animate-pulse">
                {t.common.loading}
              </p>
            </div>
          ) : (
            <div className="space-y-32">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                // Ajuste para bater com as chaves kebab-case do seu dicionário revisado
                const categoryTitle = t.categories[key as keyof typeof t.categories];

                if (!projects || projects.length === 0) return null;

                return (
                  <div key={key} className="animate-reveal">
                    <ProjectsSection 
                      title={categoryTitle || key}
                      projects={projects}
                      lang={lang}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </PageWrapper>
  );
}

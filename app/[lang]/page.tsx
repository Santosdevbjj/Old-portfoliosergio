// app/[lang]/page.tsx
import type { Metadata } from "next";

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

/**
 * ISR — revalida a cada 1 hora
 */
export const revalidate = 3600;

interface Props {
  params: { lang: "pt" | "en" | "es" };
}

/**
 * SEO específico da página inicial por idioma
 */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { lang } = params;
  const t = await getDictionary(lang);

  return {
    title: `${t.portfolio.title} | Data Science & Analytics`,
    description: t.portfolio.description,
    openGraph: {
      type: "website",
      locale:
        lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US",
      title: `${t.portfolio.title} | Data Science & Analytics`,
      description: t.portfolio.description,
      images: [`/og-image-${lang}.png`],
    },
  };
}

/**
 * Página principal do portfólio (Home)
 */
export default async function Page({ params }: Props) {
  const { lang } = params;
  const t = await getDictionary(lang);

  let repos: Record<string, GitHubRepo[]> = {};

  try {
    repos = await getPortfolioRepos();
  } catch (error) {
    console.error("GitHub API Error:", error);
  }

  const hasProjects = Object.values(repos).some(
    (list) => list && list.length > 0
  );

  return (
    <PageWrapper lang={lang}>
      {/* HERO — identidade e CTA */}
      <HeroSection dict={t} lang={lang} />

      <main role="main" className="space-y-24 md:space-y-32 pb-20">
        {/* SOBRE */}
        <section id="about" className="scroll-mt-24">
          <AboutSection locale={lang} />
        </section>

        {/* PROJETO EM DESTAQUE */}
        <section
          id="featured-case"
          className="bg-slate-50 dark:bg-slate-900/30 py-16 md:py-24"
        >
          <FeaturedProject dict={t} />
        </section>

        {/* ARTIGO / PREMIAÇÃO */}
        <section
          id="awards"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
          aria-labelledby="awards-title"
        >
          <div className="text-center mb-12">
            <h2
              id="awards-title"
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              {t.sections.awards}
            </h2>
          </div>

          <FeaturedArticleSection
            dict={t.sections}
            article={t.portfolio.featured_article}
          />
        </section>

        {/* PORTFÓLIO DINÂMICO */}
        <section
          id="featuredProjects"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
          aria-labelledby="projects-title"
        >
          <div className="text-center md:text-left mb-16 border-l-8 border-blue-600 pl-6">
            <h2
              id="projects-title"
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              {t.sections.featuredProjects}
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-400">
              {t.portfolio.description}
            </p>
          </div>

          {!hasProjects ? (
            <div className="py-24 text-center border-2 border-dashed rounded-2xl">
              <p className="text-slate-400 text-lg animate-pulse">
                {t.common.loading}
              </p>
            </div>
          ) : (
            <div className="space-y-32">
              {CATEGORIES_ORDER.map((key) => {
                const projects = repos[key];
                const title =
                  t.categories[key as keyof typeof t.categories] ||
                  key;

                if (!projects || projects.length === 0) return null;

                return (
                  <ProjectsSection
                    key={key}
                    title={title}
                    projects={projects}
                    lang={lang}
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

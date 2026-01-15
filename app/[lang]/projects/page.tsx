import { Metadata } from "next";
import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { i18n, getDictionary } from "@/lib/i18n";
import { ArrowRight, BookOpen, Calendar, Rocket } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    return {};
  }

  const t = await getDictionary(lang);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfoliosergiosantos.vercel.app";

  return {
    title: `${t.sections.featuredProjects} | Sérgio Santos`,
    description: t.portfolio.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/projects`,
      languages: {
        pt: `${baseUrl}/pt/projects`,
        en: `${baseUrl}/en/projects`,
        es: `${baseUrl}/es/projects`,
      },
    },
    openGraph: {
      title: `${t.sections.featuredProjects} | Sérgio Santos`,
      description: t.portfolio.description,
      type: "website",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
    },
  };
}

/** 🚀 SSG */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = await params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  const t = await getDictionary(lang);

  let projects = await getAllProjects(lang);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header */}
      <header className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
            <Rocket size={16} />
            {t.sections.engineeringPortfolio}
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            {t.sections.featuredProjects}
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
            {t.portfolio.description}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-12 space-y-16">
        {/* Callout */}
        <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
          {t.projects.caseStudiesIntro}{" "}
          <Link
            href={`/${lang}/projects/list`}
            className="font-bold underline decoration-blue-500 underline-offset-4"
          >
            {t.projects.repositoriesList}
          </Link>
          .
        </CalloutPersistent>

        {projects.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/5">
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">
              {t.common.loading}
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                className="group animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="block p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/20 hover:border-blue-500 transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                        <BookOpen size={12} />
                        {t.projects.caseStudy}
                      </div>

                      {project.metadata.date && (
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <Calendar size={14} />
                          {project.metadata.date}
                        </div>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                      {project.metadata.title}
                    </h2>

                    {project.metadata.description && (
                      <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                        {project.metadata.description}
                      </p>
                    )}

                    <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em]">
                      <span>{t.projects.analyzeSolution}</span>
                      <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

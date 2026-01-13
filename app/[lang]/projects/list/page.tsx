import { getDictionary, type Locale, i18n } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import { getPortfolioRepos, type GitHubRepo } from "@/lib/github";
import { Metadata } from "next";
import { Code2, Github } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

/** 🔎 SEO Dinâmico: Foco em Indexação de Software */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  return {
    title: `${dict.sections.projectsTitle} | Sérgio Santos`,
    description: dict.portfolio.description,
    openGraph: {
      title: `${dict.sections.projectsTitle} | Sérgio Santos`,
      description: dict.portfolio.description,
      images: [`/og-image-${lang}.png`],
      type: "website",
    }
  };
}

/** 🚀 Build Time Generation */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsListPage({ params }: PageProps) {
  const { lang: locale } = await params;
  const dict = getDictionary(locale);
  
  let projects: GitHubRepo[] = [];
  try {
    const reposByCategory = await getPortfolioRepos();
    
    // Flatten + Unique: Remove duplicatas caso um projeto esteja em duas categorias
    const allRepos = Object.values(reposByCategory).flat();
    projects = Array.from(new Map(allRepos.map(item => [item.id, item])).values())
      .sort((a, b) => b.stargazers_count - a.stargazers_count); // Ordena por popularidade/estrelas
  } catch (error) {
    console.error("Erro ao processar listagem de projetos:", error);
  }

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <main
      lang={htmlLangMap[locale]}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* Header com Design de Engenharia */}
      <header className="relative py-16 md:py-24 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="container mx-auto max-w-6xl px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-4">
            <Github size={16} />
            GitHub Open Source
          </div>
          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            {dict.sections.projectsTitle}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {dict.sections.projectsSubtitle || "Repositórios técnicos, ferramentas de ETL e arquiteturas distribuídas."}
          </p>
        </div>
      </header>

      {/* Grid de Projetos */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-24" aria-labelledby="projects-grid-title">
        <h2 id="projects-grid-title" className="sr-only">
          {dict.sections.projectsGridTitle}
        </h2>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
            <Code2 size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
              {dict.sections.projectsEmpty}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((repo) => (
              <div key={repo.id} className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                <ProjectCard
                  repo={repo}
                  dict={dict}
                  lang={locale}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

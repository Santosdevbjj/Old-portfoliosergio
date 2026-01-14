import { getDictionary, type Locale, i18n } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import { getPortfolioRepos, type GitHubRepo } from "@/lib/github";
import { Metadata } from "next";
import { Code2, Github, LayoutGrid } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

/** 🔎 SEO Dinâmico: Foco em Autoridade Técnica */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang); // Ajustado para await
  
  return {
    title: `${dict.sections.featuredProjects} | Sérgio Santos`,
    description: dict.portfolio.description,
    openGraph: {
      title: `${dict.sections.featuredProjects} | Sérgio Santos`,
      description: dict.portfolio.description,
      images: [`/og-image-${lang}.png`],
      type: "website",
    }
  };
}

/** 🚀 Build Time Generation (SSG) */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsListPage({ params }: PageProps) {
  const { lang: locale } = await params;
  const dict = await getDictionary(locale); // Ajustado para await
  
  let projects: GitHubRepo[] = [];
  try {
    const reposByCategory = await getPortfolioRepos();
    
    // Flatten + Unique: Consolida todos os repositórios sem duplicatas
    const allRepos = Object.values(reposByCategory).flat();
    projects = Array.from(new Map(allRepos.map(item => [item.id, item])).values())
      .sort((a, b) => b.stargazers_count - a.stargazers_count); 
  } catch (error) {
    console.error("Erro ao processar listagem de projetos:", error);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Header Estilo Dashboard de Dados */}
      <header className="relative py-20 md:py-32 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/10 overflow-hidden">
        {/* Elemento Decorativo de Grid de Fundo */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', size: '30px 30px' }} />
        
        <div className="container mx-auto max-w-6xl px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-blue-500/20">
            <Github size={14} />
            GitHub Open Source
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
            {dict.sections.featuredProjects}
          </h1>
          
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium italic">
            {dict.portfolio.description}
          </p>
        </div>
      </header>

      {/* Grid de Projetos Otimizada */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 py-20" aria-labelledby="projects-grid-title">
        <div className="flex items-center justify-between mb-12 border-l-4 border-blue-600 pl-6">
          <h2 id="projects-grid-title" className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <LayoutGrid size={24} className="text-blue-600" />
            {dict.sections.featuredProjects}
          </h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg">
            {projects.length} Repos
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-[3rem] bg-slate-50/50 dark:bg-slate-900/5 transition-all">
            <Code2 size={48} className="text-slate-300 mb-6 animate-pulse" />
            <p className="text-slate-400 dark:text-slate-500 font-bold text-lg uppercase tracking-widest">
              {dict.common.loading}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((repo, index) => (
              <div 
                key={repo.id} 
                className="animate-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
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

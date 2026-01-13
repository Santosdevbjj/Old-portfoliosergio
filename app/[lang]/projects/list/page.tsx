import { getDictionary, type Locale, i18n } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import { getPortfolioRepos, type GitHubRepo } from "@/lib/github";
import { Metadata } from "next";

interface PageProps {
  params: { lang: Locale };
}

/** 🔎 SEO Dinâmico */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return {
    title: `${dict.sections.projectsTitle} | Sérgio Santos`,
    description: dict.portfolio.description,
  };
}

/** 🚀 Pré-renderização estática dos idiomas */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ProjectsListPage({ params }: PageProps) {
  const locale = params.lang;
  const dict = getDictionary(locale);
  
  // Conectando com sua API real do GitHub configurada anteriormente
  let projects: GitHubRepo[] = [];
  try {
    const repos = await getPortfolioRepos();
    // Flatten de todas as categorias para uma lista única, se desejar mostrar todos
    projects = Object.values(repos).flat();
  } catch (error) {
    console.error("Erro ao buscar projetos para a listagem:", error);
  }

  return (
    <main
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 sm:py-16 space-y-10 min-h-screen"
    >
      <header className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {dict.sections.projectsTitle}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {dict.sections.projectsSubtitle || "Confira meus projetos e contribuições técnicas."}
        </p>
      </header>

      

      <section aria-labelledby="projects-grid-title" className="mt-12">
        <h2 id="projects-grid-title" className="sr-only">
          {dict.sections.projectsGridTitle || "Galeria de Projetos"}
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400">
              {dict.sections.noProjectsFound || "Nenhum projeto encontrado."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((repo) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                dict={dict}
                lang={locale}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

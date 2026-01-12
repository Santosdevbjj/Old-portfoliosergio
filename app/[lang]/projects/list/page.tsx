// app/[lang]/projects/list/page.tsx
import { getDictionary, type Locale } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import type { GitHubRepo } from "@/lib/github";

/**
 * ⚠️ Em produção, isso deve vir de:
 * - API (GitHub, CMS, backend)
 * - ou função server-side dedicada
 */
async function getProjects(): Promise<GitHubRepo[]> {
  return [
    {
      id: 1,
      name: "Data Science Toolkit",
      description: "Ferramentas para análise de dados.",
      html_url: "https://github.com/seuusuario/data-science-toolkit",
    },
    {
      id: 2,
      name: "Cybersecurity Lab",
      description: "Projetos de segurança cibernética.",
      html_url: "https://github.com/seuusuario/cybersecurity-lab",
    },
    {
      id: 3,
      name: "Machine Learning Models",
      description: "Modelos de aprendizado de máquina.",
      html_url: "https://github.com/seuusuario/ml-models",
    },
  ];
}

interface PageProps {
  params: { lang: Locale };
}

export default async function ProjectsListPage({ params }: PageProps) {
  const locale = params.lang;
  const dict = getDictionary(locale);
  const projects = await getProjects();

  return (
    <main
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="
        container mx-auto max-w-6xl
        px-4 lg:px-8
        py-10 sm:py-16
        space-y-10
      "
    >
      {/* TÍTULO */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          {dict.sections.projectsTitle}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {dict.sections.projectsSubtitle}
        </p>
      </header>

      {/* GRID DE PROJETOS */}
      <section aria-labelledby="projects-grid-title">
        <h2 id="projects-grid-title" className="sr-only">
          {dict.sections.projectsGridTitle}
        </h2>

        {projects.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">
            {dict.sections.noProjectsFound}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";

interface PageProps {
  params: { lang: Lang };
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = params;
  const projects = await getAllProjects(lang);

  const pageTitle =
    lang === "en"
      ? "Projects"
      : lang === "es"
      ? "Proyectos"
      : "Projetos";

  const emptyMessage =
    lang === "en"
      ? "No projects available at the moment."
      : lang === "es"
      ? "No hay proyectos disponibles en este momento."
      : "Nenhum projeto disponível no momento.";

  return (
    <section
      className="container mx-auto max-w-4xl py-10 space-y-8"
      aria-labelledby="projects-page-title"
    >
      {/* TÍTULO DA PÁGINA */}
      <header className="space-y-2">
        <h1
          id="projects-page-title"
          className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100"
        >
          {pageTitle}
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          {lang === "en" &&
            "A curated list of technical projects with detailed documentation."}
          {lang === "es" &&
            "Una lista curada de proyectos técnicos con documentación detallada."}
          {lang === "pt" &&
            "Uma lista curada de projetos técnicos com documentação detalhada."}
        </p>
      </header>

      {/* CALLOUT DE DICA */}
      <CalloutPersistent id={`projects-tip-${lang}`} type="info" lang={lang}>
        {lang === "en" &&
          "You can switch languages at any time to view the projects in other languages."}
        {lang === "es" &&
          "Puedes cambiar el idioma en cualquier momento para ver los proyectos en otros idiomas."}
        {lang === "pt" &&
          "Você pode alternar o idioma a qualquer momento para ver os projetos em outros idiomas."}
      </CalloutPersistent>

      {/* LISTAGEM */}
      {projects.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">{emptyMessage}</p>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="pb-6 border-b border-slate-200 dark:border-slate-700"
            >
              <article>
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.metadata.title}
                  </h2>

                  {project.metadata.date && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {project.metadata.date}
                    </p>
                  )}

                  {project.metadata.description && (
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      {project.metadata.description}
                    </p>
                  )}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

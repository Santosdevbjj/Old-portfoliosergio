import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang };
}

export default async function ProjectsListPage({ params }: PageProps) {
  const { lang } = params;
  const projects = await getAllProjects(lang);

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">
        {lang === "en"
          ? "All Projects"
          : lang === "es"
          ? "Todos los Proyectos"
          : "Todos os Projetos"}
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          {lang === "en"
            ? "No projects available yet."
            : lang === "es"
            ? "No hay proyectos disponibles todavía."
            : "Nenhum projeto disponível ainda."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/${lang}/projects/${project.slug}`}
              className="block rounded-lg border border-light dark:border-dark p-4 hover:shadow-lg transition-shadow bg-surface-light dark:bg-surface-dark"
            >
              <h2 className="text-lg font-semibold mb-2">
                {project.metadata.title}
              </h2>
              {project.metadata.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.metadata.date}
                </p>
              )}
              {project.metadata.description && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.metadata.description}
                </p>
              )}
              {project.metadata.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import { getAllProjects, type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang };
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = params;
  const projects = await getAllProjects(lang);

  if (!projects.length) {
    return (
      <section className="container py-10">
        <h1 className="text-2xl font-bold mb-6">
          {lang === "en"
            ? "Projects"
            : lang === "es"
            ? "Proyectos"
            : "Projetos"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {lang === "en"
            ? "No projects available yet."
            : lang === "es"
            ? "No hay proyectos disponibles todavía."
            : "Nenhum projeto disponível ainda."}
        </p>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">
        {lang === "en"
          ? "Projects"
          : lang === "es"
          ? "Proyectos"
          : "Projetos"}
      </h1>

      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-light dark:border-dark pb-4">
            <Link
              href={`/${lang}/projects/${project.slug}`}
              className="block group"
            >
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {project.metadata.title}
              </h2>
              {project.metadata.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {project.metadata.date}
                </p>
              )}
              {project.metadata.description && (
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {project.metadata.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

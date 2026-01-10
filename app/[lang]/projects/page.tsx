import { getAllProjects, type Lang } from "@/lib/mdx";
import type { Metadata } from "next";

interface PageProps {
  params: { lang: Lang };
}

/** SEO dinâmico para a página de índice */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;

  const title =
    lang === "en"
      ? "Projects"
      : lang === "es"
      ? "Proyectos"
      : "Projetos";

  const description =
    lang === "en"
      ? "Browse all portfolio projects in English."
      : lang === "es"
      ? "Explora todos los proyectos del portafolio en español."
      : "Veja todos os projetos do portfólio em português.";

  const baseUrl = "https://seusite.com"; // ajuste para seu domínio real
  const path = "/projects";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        "pt-BR": `${baseUrl}/pt${path}`,
        "en-US": `${baseUrl}/en${path}`,
        "es-ES": `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}${path}`,
      siteName: "Portfólio Sergio Santos",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectsIndex({ params }: PageProps) {
  const { lang } = params;
  const projects = await getAllProjects(lang);

  return (
    <section className="container py-10">
      <h1 className="text-2xl font-bold mb-6">
        {lang === "en"
          ? "Projects"
          : lang === "es"
          ? "Proyectos"
          : "Projetos"}
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
        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="border-b border-light dark:border-dark pb-4"
            >
              <a
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
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

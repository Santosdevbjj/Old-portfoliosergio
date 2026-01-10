// app/page.tsx
import { getDictionary, TECHNOLOGY_ORDER } from "@/lib/i18n";
import { getPortfolioRepos, GitHubRepo } from "@/lib/github";
import ProjectSection from "./components/ProjectSection";

interface HomeProps {
  params: { locale?: string };
}

export default async function Home({ params }: HomeProps) {
  // Detecta idioma pela rota (params do App Router)
  const locale = (params?.locale as "pt" | "en" | "es") ?? "pt";

  // Carrega dicionário e repositórios em paralelo
  const [dict, repos] = await Promise.all([
    getDictionary(locale),
    getPortfolioRepos({ next: { revalidate: 60 } }), // cache de 1 min
  ]);

  return (
    <section
      role="main"
      aria-label={
        locale === "en"
          ? "Main presentation"
          : locale === "es"
          ? "Presentación principal"
          : "Apresentação inicial"
      }
      lang={
        locale === "en"
          ? "en-US"
          : locale === "es"
          ? "es-ES"
          : "pt-BR"
      }
      className="container mx-auto max-w-5xl text-center px-4 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      {/* Título multilíngue */}
      <h1
        id="page-title"
        className="font-bold text-[clamp(2rem,3vw+1rem,4rem)]"
      >
        🚀 Sérgio Santos
      </h1>

      {/* Descrição multilíngue do portfólio */}
      <p
        id="page-subtitle"
        className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 dark:text-gray-300"
      >
        {dict.portfolio.title}
      </p>

      <p
        aria-describedby="page-title page-subtitle"
        className="text-[clamp(0.875rem,2vw,1rem)] text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
      >
        {dict.portfolio.description}
      </p>

      {/* Seções de projetos multilíngues */}
      <div className="mt-12 space-y-10 sm:space-y-12">
        {TECHNOLOGY_ORDER.map((tech) => {
          const filteredRepos = repos.filter((r: GitHubRepo) =>
            r.topics?.includes(tech)
          );
          if (!filteredRepos.length) return null;

          return (
            <ProjectSection
              key={tech}
              techKey={tech}
              repos={filteredRepos}
              dict={dict}
              lang={locale}
            />
          );
        })}
      </div>
    </section>
  );
}

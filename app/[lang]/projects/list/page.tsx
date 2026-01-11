"use client";

import { useState } from "react";
import { getDictionary, DEFAULT_LOCALE, Locale } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import type { GitHubRepo } from "@/lib/github";

// Simulação de projetos (em produção, você buscaria via API ou GitHub)
const mockProjects: GitHubRepo[] = [
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

interface PageProps {
  params: { lang: Locale };
}

export default function ProjectsListPage({ params }: PageProps) {
  const locale = params.lang || DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter
      ? project.description.toLowerCase().includes(filter.toLowerCase())
      : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <main
      className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 sm:py-16 space-y-8"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
    >
      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
        {dict.sections.projectsTitle}
      </h1>

      {/* Campo de busca */}
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            locale === "en"
              ? "Search projects..."
              : locale === "es"
              ? "Buscar proyectos..."
              : "Buscar projetos..."
          }
          aria-label={
            locale === "en"
              ? "Search projects"
              : locale === "es"
              ? "Buscar proyectos"
              : "Buscar projetos"
          }
          className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filtros por categorias */}
      <div className="flex flex-wrap justify-center gap-3">
        {Object.values(dict.projectCategories).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(filter === category ? null : category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === category
                ? "bg-primary text-white"
                : "bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
            }`}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((repo) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              dict={dict}
              lang={locale}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {locale === "en"
              ? "No projects found."
              : locale === "es"
              ? "No se encontraron proyectos."
              : "Nenhum projeto encontrado."}
          </p>
        )}
      </div>
    </main>
  );
}

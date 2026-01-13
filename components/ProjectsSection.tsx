"use client";

import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Dictionary, Locale } from "@/lib/i18n";

interface Props {
  title: string;
  projects: GitHubRepo[];
}

export default function ProjectSection({ title, projects }: Props) {
  // Se não houver projetos, não renderiza a seção
  if (!projects || projects.length === 0) return null;

  return (
    <section
      className="space-y-6"
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* TÍTULO DA CATEGORIA */}
      <h3
        id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-2xl font-semibold text-slate-800 dark:text-slate-200 border-l-4 border-blue-600 pl-4"
      >
        {title}
      </h3>

      {/* GRID DE PROJETOS DA CATEGORIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((repo) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>
    </section>
  );
}

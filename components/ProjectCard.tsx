"use client";

import type { GitHubRepo } from "@/lib/github";

interface Props {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: Props) {
  return (
    <article
      className="flex flex-col h-full p-6 rounded-2xl shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Nome do repositório */}
      <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
        {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
      </h4>

      {/* Descrição vinda do GitHub */}
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {repo.description || "Projeto de engenharia e análise de dados focado em eficiência e escalabilidade."}
      </p>

      {/* Tags do GitHub (Topics) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {repo.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
            {topic}
          </span>
        ))}
      </div>

      {/* Link para o GitHub */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Ver Repositório GitHub
      </a>
    </article>
  );
}

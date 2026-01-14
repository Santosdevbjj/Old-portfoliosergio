"use client";

import type { GitHubRepo } from "@/lib/github";
import { Github, Star, ExternalLink, Code2 } from "lucide-react";

interface Props {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: Props) {
  // Formata o nome do repo para ser mais amigável
  const displayName = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');

  return (
    <article
      className="group flex flex-col h-full p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
          <Code2 size={24} />
        </div>
        
        {/* Contador de Estrelas (se houver) */}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-black">
            <Star size={12} fill="currentColor" />
            {repo.stargazers_count}
          </div>
        )}
      </div>

      {/* Nome do repositório */}
      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 transition-colors capitalize">
        {displayName}
      </h4>

      {/* Descrição vinda do GitHub */}
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
        {repo.description || "Data engineering project focused on high-performance ETL pipelines and scalable architecture."}
      </p>

      {/* Tags do GitHub (Topics) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(repo.topics.length > 0 ? repo.topics.slice(0, 3) : ['Data', 'ETL', 'SQL']).map((topic) => (
          <span 
            key={topic} 
            className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Link para o GitHub */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center gap-2 w-full px-6 py-4 
          rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 
          text-xs font-black uppercase tracking-widest 
          hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white
          transition-all duration-300 shadow-lg shadow-black/5
        "
      >
        <Github size={16} />
        View Source
        <ExternalLink size={14} className="opacity-40" />
      </a>
    </article>
  );
}

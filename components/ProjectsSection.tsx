"use client";

import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import { FolderKanban } from "lucide-react";

interface Props {
  title: string;
  projects: GitHubRepo[];
}

export default function ProjectsSection({ title, projects }: Props) {
  // Verificação de segurança: não renderiza se estiver vazio
  if (!projects || projects.length === 0) return null;

  // ID seguro para acessibilidade
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      className="py-12 first:pt-0"
      aria-labelledby={sectionId}
    >
      <div className="flex items-center gap-4 mb-10 group">
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 group-hover:text-blue-600 transition-colors">
          <FolderKanban size={20} />
        </div>
        
        <div className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block order-last ml-4" />

        <h3
          id={sectionId}
          className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase"
        >
          {title}
          <span className="ml-3 text-sm font-bold text-blue-600 dark:text-blue-500 opacity-50">
            ({projects.length})
          </span>
        </h3>
      </div>

      {/* Grid com animação suave de entrada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
        {projects.map((repo, index) => (
          <div 
            key={repo.id} 
            style={{ animationDelay: `${index * 100}ms` }}
            className="h-full"
          >
            <ProjectCard repo={repo} />
          </div>
        ))}
      </div>
    </section>
  );
}

import type { GitHubRepo } from "@/lib/github";
import type { Locale } from "@/lib/i18n";
import { Github, Star, Code2, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  repo: GitHubRepo;
  buttonLabel: string;
  descriptionFallback: string;
  ariaLabel: string;
  lang: Locale;
}

export default function ProjectCard({
  repo,
  buttonLabel,
  descriptionFallback,
  ariaLabel,
  lang,
}: ProjectCardProps) {
  const htmlLang = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";

  return (
    <article
      aria-labelledby={`repo-${repo.id}-title`}
      lang={htmlLang}
      className="
        group relative flex flex-col h-full
        p-5 sm:p-6
        rounded-2xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/50
        shadow-sm hover:shadow-xl hover:shadow-blue-500/10
        transition-all duration-300
        hover:-translate-y-2
        hover:border-blue-500/50
      "
    >
      {/* Indicador visual discreto */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <Github size={24} />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Star size={14} className="text-amber-500 fill-amber-500" />
          {repo.stargazers_count || 0}
        </div>
      </div>

      {/* Nome do repositório */}
      <h3
        id={`repo-${repo.id}-title`}
        className="
          mb-3
          text-xl font-black tracking-tight
          text-slate-900 dark:text-white
          group-hover:text-blue-600 transition-colors
        "
      >
        {repo.name}
      </h3>

      {/* Descrição com limite de linhas para manter o grid alinhado */}
      <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 flex-grow">
        {repo.description || descriptionFallback}
      </p>

      {/* Footer do Card: Stack + Botão */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Code2 size={14} className="text-blue-500" />
          {repo.language || "Markdown"}
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="
            flex items-center gap-2
            text-xs font-black uppercase tracking-widest
            text-blue-600 dark:text-blue-400
            hover:text-blue-700 dark:hover:text-blue-300
            transition-colors
          "
        >
          {buttonLabel}
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

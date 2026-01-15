"use client";

import type { GitHubRepo } from "@/lib/github";
import type { Dictionary } from "@/lib/i18n";
import {
  Github,
  Star,
  ExternalLink,
  Code2,
  Circle,
} from "lucide-react";

interface Props {
  repo: GitHubRepo;
  dict: Dictionary["projects"];
}

export default function ProjectCard({ repo, dict }: Props) {
  /** Nome formatado para exibição */
  const displayName = repo.name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  /** Cores semânticas por linguagem */
  const langColors: Record<string, string> = {
    Python: "text-blue-500",
    Scala: "text-red-500",
    Java: "text-orange-600",
    SQL: "text-purple-500",
    TypeScript: "text-blue-400",
  };

  return (
    <article
      role="article"
      aria-labelledby={`project-${repo.id}-title`}
      className="
        group flex flex-col h-full p-8
        rounded-[2.5rem]
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800/60
        transition-all duration-500
        hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)]
        hover:-translate-y-3
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div
          className="
            p-4 rounded-[1.25rem]
            bg-slate-50 dark:bg-slate-800
            text-slate-400 dark:text-slate-500
            group-hover:bg-blue-600 group-hover:text-white
            transition-all duration-500 shadow-inner
          "
          aria-hidden
        >
          <Code2 size={22} />
        </div>

        <div className="flex gap-2 flex-wrap justify-end">
          {/* Linguagem */}
          {repo.language && (
            <span
              className="
                flex items-center gap-1.5 px-3 py-1
                rounded-full
                bg-slate-100 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                text-[10px] font-black uppercase tracking-tighter
              "
            >
              <Circle
                size={8}
                fill="currentColor"
                className={langColors[repo.language] || "text-slate-400"}
              />
              {repo.language}
            </span>
          )}

          {/* Stars */}
          {repo.stargazers_count > 0 && (
            <span
              className="
                flex items-center gap-1.5 px-3 py-1
                rounded-full
                bg-amber-50 dark:bg-amber-900/20
                text-amber-600 dark:text-amber-400
                text-[10px] font-black
              "
              aria-label={`${repo.stargazers_count} stars`}
            >
              <Star size={10} fill="currentColor" />
              {repo.stargazers_count}
            </span>
          )}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="space-y-3 mb-6">
        <h4
          id={`project-${repo.id}-title`}
          className="
            text-xl font-black
            text-slate-900 dark:text-white
            tracking-tighter
            group-hover:text-blue-600
            transition-colors
            leading-none
          "
        >
          {displayName}
        </h4>

        <p
          className="
            text-slate-500 dark:text-slate-400
            text-sm leading-relaxed
            line-clamp-3 font-medium
          "
        >
          {repo.description || dict.fallbackDescription}
        </p>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
        {(repo.topics?.length
          ? repo.topics.slice(0, 4)
          : dict.fallbackTopics
        ).map((topic) => (
          <span
            key={topic}
            className="
              px-3 py-1.5
              text-[9px] font-black uppercase tracking-[0.1em]
              bg-slate-50 dark:bg-slate-800/50
              text-slate-400 dark:text-slate-500
              border border-slate-100 dark:border-slate-800
              rounded-lg
              group-hover:border-blue-500/20
              transition-colors
            "
          >
            {topic}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group/btn inline-flex items-center justify-center gap-3
          w-full px-6 py-4
          rounded-2xl
          bg-slate-950 dark:bg-white
          text-white dark:text-slate-950
          text-[10px] font-black uppercase tracking-[0.2em]
          hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white
          transition-all duration-300
          shadow-xl shadow-blue-500/5
        "
        aria-label={dict.openRepository}
      >
        <Github
          size={16}
          className="group-hover/btn:rotate-12 transition-transform"
        />
        {dict.openRepository}
        <ExternalLink
          size={12}
          className="
            opacity-40
            group-hover/btn:translate-x-0.5
            group-hover/btn:-translate-y-0.5
            transition-transform
          "
        />
      </a>
    </article>
  );
}

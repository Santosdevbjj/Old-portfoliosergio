"use client";

import { useEffect, useState } from "react";
import {
  getPortfolioRepos,
  categorizeRepos,
  CATEGORIES_ORDER,
  type GitHubRepo,
  type CategoryKey,
} from "@/lib/github";
import { translations, type Locale } from "@/lib/i18n";
import { Folder, Star, Code2, ExternalLink } from "lucide-react";

interface PortfolioGridProps {
  lang: Locale;
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const dict = translations[lang];

  // Inicialização segura para evitar erros de undefined
  const [reposByCategory, setReposByCategory] = useState<Record<string, GitHubRepo[]>>({});
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(CATEGORIES_ORDER[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        // Chamada direta para a API route ou lib (idealmente via cache)
        const repos = await getPortfolioRepos();
        const categorized = categorizeRepos(repos);
        setReposByCategory(categorized);
      } catch (error) {
        console.error("Erro ao carregar repositórios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-labelledby="portfolio-title"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 id="portfolio-title" className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {dict.sections.projectsTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {lang === "pt" ? "Projetos selecionados do GitHub por categoria" : "Featured GitHub projects by category"}
          </p>
        </div>
      </div>

      {/* Tabs de categorias - Estilizadas como Pills */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES_ORDER.map((category) => {
          const label = dict.projectCategories[category] ?? category;
          const isActive = activeCategory === category;
          const count = reposByCategory[category]?.length || 0;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all
                ${isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}
              `}
            >
              {label} {!loading && <span className="ml-1 opacity-60 text-xs">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Grid de Conteúdo */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : reposByCategory[activeCategory]?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reposByCategory[activeCategory].map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800 
                  bg-white dark:bg-slate-900/50 hover:border-blue-500 dark:hover:border-blue-500 
                  transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1
                "
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Folder className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                    <ExternalLink className="text-slate-300 group-hover:text-blue-500 w-5 h-5 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {repo.description || (lang === "en" ? "Technical project details on GitHub." : "Detalhes técnicos no GitHub.")}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Code2 size={14} className="text-blue-500" />
                    {repo.language || "Stack"}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    {repo.stargazers_count}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <p className="text-slate-500 font-medium">
              {lang === "en" ? "No projects found in this category." : "Nenhum projeto encontrado nesta categoria."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

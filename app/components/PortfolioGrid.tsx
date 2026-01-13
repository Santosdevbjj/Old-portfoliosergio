"use client";

import { useEffect, useState } from "react";
import {
  getPortfolioRepos,
  CATEGORIES_ORDER,
  type GitHubRepo,
  type CategoryKey,
} from "@/lib/github";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Folder, Star, Code2, ExternalLink, Search } from "lucide-react";

interface PortfolioGridProps {
  lang: Locale;
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const dict = getDictionary(lang);

  const [reposByCategory, setReposByCategory] = useState<Record<CategoryKey, GitHubRepo[]>>({} as any);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(CATEGORIES_ORDER[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        // Agora o getPortfolioRepos já retorna o objeto categorizado
        const data = await getPortfolioRepos();
        setReposByCategory(data);
      } catch (error) {
        console.error("Erro ao carregar repositórios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="portfolio-title">
      {/* Header da Seção */}
      <div className="text-center mb-12">
        <h2 id="portfolio-title" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {dict.sections.projectsTitle}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
          {dict.sections.projectsGridTitle}
        </p>
      </div>

      {/* Navegação por Categorias (Pills) - Altamente Responsivo */}
      <div className="relative mb-12">
        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES_ORDER.map((category) => {
            const label = dict.projectCategories[category] || category;
            const isActive = activeCategory === category;
            const count = reposByCategory[category]?.length || 0;

            // Só mostra a categoria se houver projetos ou se estiver carregando
            if (!loading && count === 0) return null;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}
                `}
              >
                {label}
                {!loading && <span className={`ml-2 text-xs ${isActive ? "text-blue-100" : "opacity-50"}`}>{count}</span>}
              </button>
            );
          })}
        </div>
        {/* Indicador visual de scroll para Mobile */}
        <div className="md:hidden absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white dark:from-slate-950 pointer-events-none" />
      </div>

      {/* Grid de Projetos */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : reposByCategory[activeCategory]?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reposByCategory[activeCategory].map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200 dark:border-slate-800 
                  bg-white dark:bg-slate-900/40 hover:border-blue-500 dark:hover:border-blue-500 
                  transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2
                "
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:bg-blue-600 transition-colors duration-500">
                      <Folder className="text-blue-600 dark:text-blue-400 group-hover:text-white w-6 h-6" />
                    </div>
                    <ExternalLink className="text-slate-300 group-hover:text-blue-500 w-5 h-5 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                    {repo.description || dict.sections.projectsEmpty}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Code2 size={14} className="text-blue-500" />
                    {repo.language || "Engine"}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    {repo.stargazers_count}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-center px-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-full mb-6">
              <Search className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{dict.sections.noProjectsFound}</h3>
            <p className="text-slate-500 max-w-xs">{dict.sections.searchLabel}</p>
          </div>
        )}
      </div>
    </section>
  );
}

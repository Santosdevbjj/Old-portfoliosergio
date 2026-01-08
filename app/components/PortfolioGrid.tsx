"use client";

import { useEffect, useState } from "react";
import { getPortfolioRepos, CATEGORIES_ORDER, type GitHubRepo } from "@/lib/github";
import { getTranslation, type Locale } from "@/lib/i18n";

interface PortfolioGridProps {
  lang: Locale;
}

export default function PortfolioGrid({ lang }: PortfolioGridProps) {
  const [reposByCategory, setReposByCategory] = useState<Record<string, GitHubRepo[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES_ORDER[0]);
  const dict = getTranslation(lang);

  useEffect(() => {
    async function fetchRepos() {
      const categorized = await getPortfolioRepos();
      setReposByCategory(categorized);
    }
    fetchRepos();
  }, []);

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-label="Portfolio grid"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {dict.sections.projectsTitle}
      </h2>

      {/* Tabs responsivas */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {CATEGORIES_ORDER.map((category) => {
          const label = dict.sections[category as keyof typeof dict.sections] ?? category;
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Conteúdo da aba ativa */}
      <div>
        {reposByCategory[activeCategory] && reposByCategory[activeCategory].length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reposByCategory[activeCategory].map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition p-4"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {repo.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                  {repo.description || dict.sections.stackUpdating}
                </p>

                {/* Metadados */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{repo.language ?? "N/A"}</span>
                  <span>⭐ {repo.stargazers_count ?? 0}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {dict.sections.stackUpdating}
          </p>
        )}
      </div>
    </section>
  );
}

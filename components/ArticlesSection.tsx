"use client";

import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface Props {
  locale: Locale;
  dict: Translations;
  articles: Article[];
}

export default function ArticlesSection({ locale, dict, articles }: Props) {
  const htmlLang =
    locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR";

  return (
    <section
      id="articles"
      role="region"
      aria-labelledby="articles-title"
      lang={htmlLang}
      className="
        max-w-7xl mx-auto
        px-4 lg:px-8
        py-12 sm:py-20
        space-y-10
      "
    >
      {/* TÍTULO */}
      <h2
        id="articles-title"
        className="
          text-3xl sm:text-4xl
          font-bold
          text-slate-900 dark:text-slate-100
          text-center
        "
      >
        {dict.sections.articlesTitle}
      </h2>

      {/* GRID DE ARTIGOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article.id}
              aria-labelledby={`article-${article.id}-title`}
              className="
                w-full p-4 sm:p-6
                rounded-xl
                shadow-lg
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
                transition-transform duration-300
                hover:scale-105 hover:shadow-2xl
              "
            >
              {/* TÍTULO DO ARTIGO */}
              <h3
                id={`article-${article.id}-title`}
                className="
                  font-bold
                  text-[clamp(1rem,2vw+0.5rem,1.25rem)]
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-purple-500 to-pink-500
                  mb-2
                "
              >
                {article.title}
              </h3>

              {/* DESCRIÇÃO */}
              <p className="text-[clamp(0.875rem,2vw,1rem)] text-slate-600 dark:text-slate-300 mb-4">
                {article.description}
              </p>

              {/* CTA */}
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  locale === "en"
                    ? `Read article ${article.title}`
                    : locale === "es"
                    ? `Leer artículo ${article.title}`
                    : `Ler artigo ${article.title}`
                }
                className="
                  inline-block
                  px-[clamp(0.75rem,2vw,1rem)]
                  py-[clamp(0.5rem,1.5vw,0.75rem)]
                  rounded-md
                  bg-gradient-to-r from-purple-500 to-pink-500
                  text-white font-semibold
                  hover:scale-105
                  transition-transform duration-300
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-purple-500
                "
              >
                {dict.sections.readArticle} →
              </Link>
            </article>
          ))
        ) : (
          <p className="text-center text-slate-600 dark:text-slate-400">
            {dict.sections.noArticles}
          </p>
        )}
      </div>

      {/* CTA FINAL – REPOSITÓRIO DE ARTIGOS */}
      <div className="text-center">
        <Link
          href={`/${locale}/articles`}
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-xl
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white font-semibold
            hover:scale-105
            transition-transform
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          "
        >
          {dict.projectCategories.articlesRepo} →
        </Link>
      </div>
    </section>
  );
}

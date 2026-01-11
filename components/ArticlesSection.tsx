"use client";

import Link from "next/link";
import { getDictionary, DEFAULT_LOCALE, Locale } from "@/lib/i18n";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface Props {
  locale?: Locale;
  articles: Article[]; // lista de artigos técnicos (pode vir de API, CMS ou mock)
}

export default function ArticlesSection({ locale = DEFAULT_LOCALE, articles }: Props) {
  const dict = getDictionary(locale);

  return (
    <section
      id="articles"
      role="region"
      aria-labelledby="articles-title"
      lang={locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR"}
      className="container mx-auto max-w-6xl px-4 lg:px-8 py-10 sm:py-16 space-y-8"
    >
      {/* Título multilíngue */}
      <h2
        id="articles-title"
        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center"
      >
        {dict.sections.articlesTitle}
      </h2>

      {/* Grid de artigos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article.id}
              role="article"
              aria-labelledby={`article-${article.id}-title`}
              className="w-full p-4 sm:p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Título do artigo */}
              <h3
                id={`article-${article.id}-title`}
                className="font-bold text-[clamp(1rem,2vw+0.5rem,1.25rem)] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-textGradient mb-2"
              >
                {article.title}
              </h3>

              {/* Descrição */}
              <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-300 mb-4">
                {article.description}
              </p>

              {/* Botão multilíngue */}
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
                className="inline-block px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
              >
                {locale === "en"
                  ? "Read article →"
                  : locale === "es"
                  ? "Leer artículo →"
                  : "Ler artigo →"}
              </Link>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {locale === "en"
              ? "No articles available."
              : locale === "es"
              ? "No hay artículos disponibles."
              : "Nenhum artigo disponível."}
          </p>
        )}
      </div>

      {/* Link para repositório de artigos */}
      <div className="text-center">
        <Link
          href={`/${locale}/articles`}
          className="inline-block px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {dict.projectCategories.articlesRepo}
        </Link>
      </div>
    </section>
  );
}

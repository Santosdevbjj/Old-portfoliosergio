import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import { BookOpen, ArrowRight, Newspaper } from "lucide-react";

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

// Removido "use client" - Componentes de listagem estática devem ser Server Components
export default function ArticlesSection({ locale, dict, articles }: Props) {
  const htmlLang = locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR";

  return (
    <section
      id="articles"
      role="region"
      aria-labelledby="articles-title"
      lang={htmlLang}
      className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-32 space-y-16"
    >
      {/* HEADER DA SEÇÃO */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest">
          <Newspaper size={14} />
          {dict.navigation.articles || "Articles"}
        </div>
        <h2
          id="articles-title"
          className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {dict.sections.articlesTitle}
        </h2>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
      </div>

      {/* GRID DE ARTIGOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article
              key={article.id}
              aria-labelledby={`article-${article.id}-title`}
              className="group relative flex flex-col p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="mb-6 p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>

              <h3
                id={`article-${article.id}-title`}
                className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {article.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">
                {article.description}
              </p>

              <Link
                href={article.url}
                target={article.url.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="inline-flex items-center font-bold text-blue-600 dark:text-blue-400 group/link"
              >
                {dict.sections.readArticle}
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </article>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <p className="text-slate-500 dark:text-slate-400 italic">
              {dict.sections.noArticles}
            </p>
          </div>
        )}
      </div>

      {/* CTA FINAL – REPOSITÓRIO COMPLETO */}
      <div className="text-center pt-8">
        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all hover:scale-105 shadow-xl"
        >
          {dict.projectCategories.articlesRepo}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

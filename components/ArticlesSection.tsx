import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import {
  BookOpen,
  ArrowRight,
  Newspaper,
  ExternalLink,
} from "lucide-react";

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

export default function ArticlesSection({
  locale,
  dict,
  articles,
}: Props) {
  const htmlLangMap: Record<Locale, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  const hasArticles = Array.isArray(articles) && articles.length > 0;

  return (
    <section
      id="articles"
      role="region"
      aria-labelledby="articles-title"
      lang={htmlLangMap[locale]}
      className="
        max-w-7xl mx-auto
        px-6 lg:px-8
        py-20 sm:py-32
        space-y-16
      "
    >
      {/* ================= HEADER ================= */}
      <header className="flex flex-col items-center text-center space-y-6">
        <div
          className="
            inline-flex items-center gap-2
            px-4 py-1.5
            rounded-full
            bg-blue-50 dark:bg-blue-900/20
            text-blue-600 dark:text-blue-400
            text-[10px] font-black
            uppercase tracking-[0.25em]
            border border-blue-100 dark:border-blue-800/50
          "
        >
          <Newspaper size={14} aria-hidden />
          {dict.navigation.articles || "Articles"}
        </div>

        <h2
          id="articles-title"
          className="
            text-[clamp(2.5rem,5vw,3.75rem)]
            font-black
            tracking-tighter
            text-slate-900 dark:text-white
          "
        >
          {dict.sections.articlesTitle}
        </h2>

        <div className="h-2 w-24 bg-blue-600 rounded-full" />
      </header>

      {/* ================= GRID ================= */}
      <div
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {hasArticles ? (
          articles.map((article) => {
            const isExternal = article.url.startsWith("http");

            return (
              <article
                key={article.id}
                role="listitem"
                aria-labelledby={`article-${article.id}-title`}
                className="
                  group relative
                  flex flex-col
                  p-6 sm:p-8 md:p-10
                  rounded-[2.5rem]
                  bg-white dark:bg-slate-900/40
                  border border-slate-100 dark:border-slate-800/50
                  backdrop-blur-sm
                  transition-all duration-500
                  hover:border-blue-500/50
                  hover:-translate-y-2
                  hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]
                  dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)]
                "
              >
                {/* Glow */}
                <div
                  aria-hidden
                  className="
                    absolute inset-0
                    rounded-[2.5rem]
                    bg-gradient-to-br from-blue-600/5 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Ícone */}
                  <div
                    className="
                      mb-8
                      p-4 w-fit
                      rounded-2xl
                      bg-slate-50 dark:bg-slate-800
                      text-blue-600 dark:text-blue-400
                      transition-all duration-500
                      group-hover:bg-blue-600
                      group-hover:text-white
                      group-hover:rotate-3
                    "
                  >
                    <BookOpen size={24} aria-hidden />
                  </div>

                  {/* Título */}
                  <h3
                    id={`article-${article.id}-title`}
                    className="
                      text-xl sm:text-2xl
                      font-black
                      tracking-tight
                      leading-tight
                      text-slate-900 dark:text-white
                      mb-4
                      transition-colors
                      group-hover:text-blue-600
                      dark:group-hover:text-blue-400
                    "
                  >
                    {article.title}
                  </h3>

                  {/* Descrição */}
                  <p
                    className="
                      text-base
                      font-medium
                      leading-relaxed
                      text-slate-500 dark:text-slate-400
                      mb-10
                      flex-grow
                    "
                  >
                    {article.description}
                  </p>

                  {/* Link */}
                  <Link
                    href={article.url}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${dict.sections.readArticle}: ${article.title}`}
                    className="
                      inline-flex items-center gap-2
                      text-xs font-black
                      uppercase tracking-[0.25em]
                      text-blue-600 dark:text-blue-400
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-blue-500
                    "
                  >
                    {dict.sections.readArticle}
                    {isExternal ? (
                      <ExternalLink
                        size={14}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden
                      />
                    ) : (
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-2"
                        aria-hidden
                      />
                    )}
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div
            className="
              col-span-full
              py-24
              text-center
              rounded-[3rem]
              border-2 border-dashed
              border-slate-200 dark:border-slate-800/50
              bg-slate-50/50 dark:bg-slate-900/20
            "
          >
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
              {dict.sections.noArticles}
            </p>
          </div>
        )}
      </div>

      {/* ================= CTA FINAL ================= */}
      <div className="relative text-center pt-12">
        <div
          aria-hidden
          className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-slate-800 -z-10"
        />

        <Link
          href={`/${locale}/articles`}
          className="
            inline-flex items-center gap-4
            px-8 sm:px-10 py-5
            rounded-2xl
            bg-slate-950 dark:bg-white
            text-white dark:text-slate-950
            font-black text-xs
            uppercase tracking-[0.3em]
            transition-all
            hover:bg-blue-600
            dark:hover:bg-blue-600 dark:hover:text-white
            hover:scale-105
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-blue-500
            shadow-2xl shadow-blue-500/20
          "
        >
          {dict.projectCategories.articlesRepo}
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

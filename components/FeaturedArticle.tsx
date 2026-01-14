import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";
import Link from "next/link";
import { Award, ExternalLink, Linkedin, BookOpen, PenTool } from "lucide-react";

interface Props {
  locale?: Locale;
}

export default function FeaturedArticle({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);
  const links = dict.featuredArticle.links;

  const htmlLang = locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR";

  return (
    <section
      id="featured-article"
      role="region"
      aria-labelledby="featured-article-title"
      lang={htmlLang}
      className="container mx-auto max-w-5xl px-6 py-16 md:py-24"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 md:p-16 transition-all hover:shadow-2xl hover:shadow-blue-500/5 group">
        
        {/* Elemento Decorativo de Fundo */}
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          
          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-[0.2em]">
            <Award size={14} className="animate-bounce" />
            {dict.sections.featuredArticle}
          </div>

          {/* Títulos */}
          <div className="space-y-4 max-w-3xl">
            <h2
              id="featured-article-title"
              className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
            >
              {dict.featuredArticle.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {dict.featuredArticle.description}
            </p>
          </div>

          {/* Prêmios/Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {[dict.featuredArticle.award1, dict.featuredArticle.award2].map((award, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                🏆 {award}
              </span>
            ))}
          </div>

          {/* Botões das plataformas */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {links.dio && (
              <Link
                href={links.dio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-black hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                <BookOpen size={18} />
                DIO
                <ExternalLink size={14} className="opacity-50" />
              </Link>
            )}

            {links.linkedin && (
              <Link
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0077b5] text-white font-black hover:brightness-110 transition-all hover:scale-105 shadow-lg shadow-blue-500/10"
              >
                <Linkedin size={18} />
                LinkedIn
              </Link>
            )}

            {links.medium && (
              <Link
                href={links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:opacity-90 transition-all hover:scale-105"
              >
                <PenTool size={18} />
                Medium
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

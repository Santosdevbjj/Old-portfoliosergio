import { DEFAULT_LOCALE, getDictionary, Locale } from "@/lib/i18n";
import Link from "next/link";
import { Award, ExternalLink, Linkedin, BookOpen, PenTool, Sparkles } from "lucide-react";

interface Props {
  locale?: Locale;
}

export default function FeaturedArticle({ locale = DEFAULT_LOCALE }: Props) {
  const dict = getDictionary(locale);
  const links = dict.featuredArticle.links;
  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <section
      id="featured-article"
      role="region"
      aria-labelledby="featured-article-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-5xl px-6 py-16 md:py-24"
    >
      <div className="relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 p-8 md:p-16 transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.1)] group">
        
        {/* Efeito de Gradiente Radial em Movimento (Substitui o blur estático) */}
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700 -z-10" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          
          {/* Badge de Destaque com Sparkles */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 dark:border-blue-800/50">
            <Sparkles size={14} className="animate-pulse" />
            {dict.sections.featuredArticle}
          </div>

          {/* Títulos com Tracking Tighter */}
          <div className="space-y-6 max-w-3xl">
            <h2
              id="featured-article-title"
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter"
            >
              {dict.featuredArticle.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {dict.featuredArticle.description}
            </p>
          </div>

          {/* Prêmios com Estilo de Chip de Engenharia */}
          <div className="flex flex-wrap justify-center gap-3">
            {[dict.featuredArticle.award1, dict.featuredArticle.award2].filter(Boolean).map((award, i) => (
              <span 
                key={i} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 shadow-sm"
              >
                <Award size={14} className="text-amber-500" />
                {award}
              </span>
            ))}
          </div>

          {/* Grid de Botões (Layout mais robusto) */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {links.dio && (
              <Link
                href={links.dio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 active:scale-95"
              >
                <BookOpen size={18} />
                DIO Article
                <ExternalLink size={14} className="opacity-50" />
              </Link>
            )}

            {links.linkedin && (
              <Link
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-600 transition-all hover:scale-105 shadow-xl active:scale-95"
              >
                <Linkedin size={18} className="text-[#0077b5] group-hover:text-white" />
                LinkedIn
              </Link>
            )}

            {links.medium && (
              <Link
                href={links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-blue-50 transition-all hover:scale-105 shadow-xl border border-slate-200 active:scale-95"
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

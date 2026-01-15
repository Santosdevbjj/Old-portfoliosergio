import {
  DEFAULT_LOCALE,
  getDictionary,
  Locale,
} from "@/lib/i18n";
import Link from "next/link";
import {
  Award,
  ExternalLink,
  Linkedin,
  BookOpen,
  PenTool,
  Sparkles,
} from "lucide-react";

interface Props {
  locale?: Locale;
}

export default function FeaturedArticle({
  locale = DEFAULT_LOCALE,
}: Props) {
  const dict = getDictionary(locale);
  const links = dict.featuredArticle.links;

  const htmlLangMap: Record<Locale, string> = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  return (
    <section
      id="featured-article"
      role="region"
      aria-labelledby="featured-article-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-5xl px-6 py-16 sm:py-20 md:py-28"
    >
      <div
        className="
          relative overflow-hidden
          rounded-[3rem]
          bg-white dark:bg-slate-900/40
          border border-slate-200 dark:border-slate-800/60
          p-6 sm:p-8 md:p-16
          transition-all duration-500
          hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.12)]
          group
        "
      >
        {/* Gradiente decorativo */}
        <div
          aria-hidden
          className="
            absolute -top-24 -right-24
            h-96 w-96
            rounded-full
            bg-blue-600/10
            blur-[110px]
            transition-all duration-700
            group-hover:bg-blue-600/20
            -z-10
          "
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-blue-50 dark:bg-blue-900/20
              text-blue-600 dark:text-blue-400
              text-[10px] font-black
              uppercase tracking-[0.35em]
              border border-blue-100 dark:border-blue-800/50
            "
          >
            <Sparkles size={14} className="animate-pulse" aria-hidden />
            {dict.sections.featuredArticle}
          </div>

          {/* Conteúdo */}
          <div className="space-y-6 max-w-3xl">
            <h2
              id="featured-article-title"
              className="
                text-[clamp(2.25rem,5vw,3.75rem)]
                font-black
                leading-[1.1]
                tracking-tighter
                text-slate-900 dark:text-white
              "
            >
              {dict.featuredArticle.title}
            </h2>

            <p
              className="
                text-base sm:text-lg md:text-xl
                font-medium
                leading-relaxed
                text-slate-500 dark:text-slate-400
              "
            >
              {dict.featuredArticle.description}
            </p>
          </div>

          {/* Prêmios */}
          <div className="flex flex-wrap justify-center gap-3">
            {[dict.featuredArticle.award1, dict.featuredArticle.award2]
              .filter(Boolean)
              .map((award, i) => (
                <span
                  key={i}
                  className="
                    flex items-center gap-2
                    px-5 py-2.5
                    rounded-2xl
                    bg-slate-50 dark:bg-slate-800/50
                    border border-slate-100 dark:border-slate-800
                    text-[11px] font-black
                    uppercase tracking-widest
                    text-slate-600 dark:text-slate-300
                    shadow-sm
                  "
                >
                  <Award size={14} className="text-amber-500" aria-hidden />
                  {award}
                </span>
              ))}
          </div>

          {/* Botões */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 w-full">
            {links.dio && (
              <Link
                href={links.dio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read article on DIO"
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-3
                  px-8 py-4
                  rounded-2xl
                  bg-blue-600
                  text-white
                  text-xs font-black
                  uppercase tracking-widest
                  transition-all
                  hover:bg-blue-700
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  shadow-xl shadow-blue-500/20
                "
              >
                <BookOpen size={18} aria-hidden />
                DIO
                <ExternalLink size={14} className="opacity-60" aria-hidden />
              </Link>
            )}

            {links.linkedin && (
              <Link
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read article on LinkedIn"
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-3
                  px-8 py-4
                  rounded-2xl
                  bg-slate-900 dark:bg-slate-800
                  text-white
                  text-xs font-black
                  uppercase tracking-widest
                  transition-all
                  hover:bg-blue-600
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  shadow-xl
                "
              >
                <Linkedin size={18} aria-hidden />
                LinkedIn
              </Link>
            )}

            {links.medium && (
              <Link
                href={links.medium}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read article on Medium"
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-3
                  px-8 py-4
                  rounded-2xl
                  bg-white
                  text-slate-900
                  text-xs font-black
                  uppercase tracking-widest
                  transition-all
                  hover:bg-slate-100
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  border border-slate-200
                  shadow-xl
                "
              >
                <PenTool size={18} aria-hidden />
                Medium
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { getDictionary, Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

// Removido o "use client" para torná-lo um Server Component
export default function AboutSection({ locale }: Props) {
  const dict = getDictionary(locale);

  // Mapeamento de idioma para o atributo 'lang'
  const htmlLangMap = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-5xl px-4 lg:px-8 py-16 sm:py-24 space-y-12 transition-colors duration-300"
    >
      <div className="space-y-6">
        {/* Título com detalhe visual (border-left ou underline) */}
        <h2
          id="about-title"
          className="font-bold text-[clamp(2rem,4vw,3rem)] text-slate-900 dark:text-white border-l-4 border-blue-600 pl-4"
        >
          {dict.sections.aboutTitle}
        </h2>

        {/* Introdução com destaque (Lead text) */}
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
          {dict.sections.aboutIntro}
        </p>

        {/* Detalhes com melhor legibilidade */}
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
          {dict.sections.aboutDetails}
        </p>
      </div>

      

      {/* Grids de Informação Técnica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-slate-200 dark:border-slate-800 pt-10">
        <div className="space-y-3">
          <h3 className="font-bold text-lg uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {dict.sections.experienceTitle}
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            {[dict.experience.item1, dict.experience.item2, dict.experience.item3].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2">▹</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {dict.sections.reskillingTitle}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {dict.experience.reskilling}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {dict.sections.differentialTitle}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {dict.experience.differential}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-lg uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {dict.sections.objectiveTitle}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            {dict.experience.objective}
          </p>
        </div>
      </div>
    </section>
  );
}

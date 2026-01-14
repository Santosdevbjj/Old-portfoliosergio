import { getDictionary, Locale } from "@/lib/i18n";
import { Briefcase, GraduationCap, Target, Award } from "lucide-react";

interface Props {
  locale: Locale;
}

export default function AboutSection({ locale }: Props) {
  const dict = getDictionary(locale);

  const htmlLangMap = {
    en: "en-US",
    es: "es-ES",
    pt: "pt-BR",
  };

  const sections = [
    {
      title: dict.sections.experienceTitle,
      content: [dict.experience.item1, dict.experience.item2, dict.experience.item3].filter(Boolean),
      icon: <Briefcase className="text-blue-600 dark:text-blue-400" size={22} />,
      isList: true
    },
    {
      title: dict.sections.reskillingTitle,
      content: dict.experience.reskilling,
      icon: <GraduationCap className="text-blue-600 dark:text-blue-400" size={22} />,
      isList: false
    },
    {
      title: dict.sections.differentialTitle,
      content: dict.experience.differential,
      icon: <Award className="text-blue-600 dark:text-blue-400" size={22} />,
      isList: false
    },
    {
      title: dict.sections.objectiveTitle,
      content: dict.experience.objective,
      icon: <Target className="text-blue-600 dark:text-blue-400" size={22} />,
      isList: false,
      isHighlight: true // Flag para tratamento visual especial
    }
  ];

  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-title"
      lang={htmlLangMap[locale]}
      className="container mx-auto max-w-6xl px-6 lg:px-8 py-20 sm:py-32 space-y-20"
    >
      {/* Bloco de Introdução Narrativa */}
      <div className="max-w-4xl space-y-10">
        <div className="space-y-4">
          <h2
            id="about-title"
            className="font-black text-5xl md:text-7xl text-slate-900 dark:text-white tracking-tighter"
          >
            {dict.sections.aboutTitle}
          </h2>
          <div className="h-2 w-24 bg-blue-600 rounded-full" />
        </div>

        <div className="space-y-8">
          <p className="text-2xl md:text-4xl text-slate-800 dark:text-slate-100 leading-[1.1] font-black tracking-tight">
            {dict.sections.aboutIntro}
          </p>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {dict.sections.aboutDetails}
          </p>
        </div>
      </div>

      {/* Grid Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {sections.map((sec, index) => (
          <div 
            key={index} 
            className={`
              p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden
              ${sec.isHighlight 
                ? 'bg-blue-600 text-white md:col-span-2 shadow-2xl shadow-blue-500/20' 
                : 'bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-blue-500/30 shadow-sm'}
            `}
          >
            {/* Decoração interna para o card destacado */}
            {sec.isHighlight && (
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Target size={240} />
              </div>
            )}

            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className={`
                p-3.5 rounded-2xl shadow-sm transition-all duration-500 group-hover:rotate-6
                ${sec.isHighlight ? 'bg-white/10 text-white' : 'bg-slate-50 dark:bg-slate-800 text-blue-600'}
              `}>
                {sec.icon}
              </div>
              <h3 className={`font-black text-sm uppercase tracking-[0.2em] ${sec.isHighlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {sec.title}
              </h3>
            </div>

            <div className="relative z-10 leading-relaxed">
              {sec.isList && Array.isArray(sec.content) ? (
                <ul className="space-y-5">
                  {sec.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 font-bold text-sm md:text-base">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`
                  text-lg md:text-xl font-bold
                  ${sec.isHighlight ? 'text-blue-50' : 'text-slate-600 dark:text-slate-400'}
                `}>
                  {sec.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

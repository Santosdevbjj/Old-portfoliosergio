import React from "react";
import { Dictionary } from "@/lib/i18n";
import { FileText, ChevronDown, Database, ShieldCheck } from "lucide-react";

type HeroSectionProps = {
  dict: Dictionary;
  lang: "pt" | "en" | "es";
};

const HeroSection: React.FC<HeroSectionProps> = ({ dict, lang }) => {
  const cvPath = `/cv-sergio-santos-${lang}.pdf`;

  return (
    <section
      role="region"
      aria-labelledby="hero-title"
      className="relative flex flex-col items-center justify-center text-center min-h-[85vh] md:min-h-[90vh] px-6 py-20 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-5xl w-full space-y-10">
        
        {/* Badge de Status / Localização */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Sérgio Santos • Data Engineer
        </div>

        {/* TÍTULO PRINCIPAL */}
        <div className="space-y-4">
          <h1
            id="hero-title"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
          >
            {/* Se você tiver uma chave específica para o nome no dict, use-a aqui */}
            SÉRGIO <span className="text-blue-600">SANTOS.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-500 dark:text-slate-400 tracking-tight">
            {dict.sections.aboutIntro}
          </p>
        </div>

        {/* GRUPO DE BOTÕES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <a
            href="#featured-project"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Database size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
            {dict.portfolio.buttonLabel}
          </a>

          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:border-blue-600 dark:hover:border-blue-500 transition-all hover:shadow-lg"
          >
            <FileText size={18} className="mr-2 text-blue-600" />
            {dict.cv.label}
          </a>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 animate-bounce text-slate-300 dark:text-slate-700">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default HeroSection;

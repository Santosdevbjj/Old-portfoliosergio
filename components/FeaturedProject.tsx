import React from "react";
import type { Dictionary } from "@/lib/i18n";
import { ArrowUpRight, Zap, Target, BarChart3, ShieldCheck, Quote } from "lucide-react";

type FeaturedProjectProps = {
  dict: Dictionary;
};

export default function FeaturedProject({ dict }: FeaturedProjectProps) {
  const { featuredProject, sections } = dict;

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-title"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título da Seção - Alinhamento Premium */}
        <div className="flex flex-col mb-16 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-2 bg-blue-600 rounded-full" />
            <h2
              id="featured-project-title"
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
            >
              {sections.featuredProjectTitle}
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl ml-6">
            {dict.sections.featuredProjectDescription || "Deep dive into a high-impact engineering solution."}
          </p>
        </div>

        {/* Card Principal: Layout Bento Box de Alta Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800">
          
          {/* PAINEL ESQUERDO: Branding e Stack */}
          <div className="p-10 md:p-16 bg-blue-600 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Grid Decorativo de Engenharia */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Gradiente de profundidade */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl shadow-inner">
                <ShieldCheck size={14} className="text-blue-200" />
                {featuredProject.badge}
              </span>

              <h3 className="text-5xl md:text-7xl font-black leading-[1] tracking-tighter">
                {featuredProject.title}
              </h3>

              <div className="relative p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors duration-500">
                <Quote className="absolute -top-4 -left-2 text-blue-300 opacity-40 w-10 h-10 -rotate-12" />
                <p className="italic text-blue-50 text-xl md:text-2xl leading-relaxed font-medium relative z-10">
                  {featuredProject.highlight}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 pt-16">
              {featuredProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2 bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest backdrop-blur-md hover:bg-white hover:text-blue-600 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* PAINEL DIREITO: Storytelling de Engenharia */}
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-14 bg-white dark:bg-slate-900 relative">
            
            {/* Item 01: O Problema - Foco em Negócio */}
            <div className="space-y-4 group">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.challengeTitle}
              </div>
              <p className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                {featuredProject.problem}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {featuredProject.baselineLabel}: <span className="text-slate-900 dark:text-white ml-1">{featuredProject.baseline}</span>
              </div>
            </div>

            {/* Item 02: A Solução - Foco em Tecnologia */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.solutionTitle}
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                {featuredProject.solution}
              </p>
            </div>

            {/* Item 03: Impacto - Foco em Resultados */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="h-1 w-6 bg-current rounded-full" />
                {featuredProject.impactTitle}
              </div>
              <div className="p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-[2rem] relative overflow-hidden group/impact">
                <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/10 -rotate-12 group-hover/impact:scale-125 transition-transform duration-700" />
                <p className="text-emerald-900 dark:text-emerald-300 font-black text-2xl md:text-3xl tracking-tighter relative z-10 leading-none">
                  {featuredProject.result}
                </p>
              </div>
            </div>

            {/* CTA Final: Ação Clara */}
            <div className="pt-6">
              <a
                href={featuredProject.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xl shadow-blue-500/10 hover:scale-[1.02] active:scale-95"
              >
                {featuredProject.ctaLabel}
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

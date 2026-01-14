import React from "react";
import type { Dictionary } from "@/lib/i18n";
import { ArrowUpRight, Zap, Target, BarChart3, ShieldCheck } from "lucide-react";

type FeaturedProjectProps = {
  dict: Dictionary;
};

export default function FeaturedProject({ dict }: FeaturedProjectProps) {
  const { featuredProject, sections } = dict;

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-title"
      className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <div className="h-10 w-1.5 bg-blue-600 rounded-full" />
          <h2
            id="featured-project-title"
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {sections.featuredProjectTitle}
          </h2>
        </div>

        {/* Card Principal: Arquitetura Bento Box Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/5 border border-slate-200 dark:border-slate-800">
          
          {/* PAINEL ESQUERDO: Identidade e Tech Stack */}
          <div className="p-8 md:p-14 bg-blue-600 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Elemento Decorativo: Grid de Engenharia */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="relative z-10 space-y-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                <ShieldCheck size={14} />
                {featuredProject.badge}
              </span>

              <h3 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter">
                {featuredProject.title}
              </h3>

              <div className="relative p-6 bg-white/5 rounded-3xl border border-white/10 italic text-blue-50 text-xl leading-relaxed">
                <span className="absolute -top-4 left-4 text-4xl text-blue-300 opacity-50 font-serif">“</span>
                {featuredProject.highlight}
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 pt-12">
              {featuredProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-500/40 border border-white/10 rounded-xl text-xs font-bold backdrop-blur-md hover:bg-white hover:text-blue-600 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* PAINEL DIREITO: Storytelling (O Desafio de Dados) */}
          <div className="p-8 md:p-14 flex flex-col justify-center space-y-12 bg-white dark:bg-slate-900">
            
            {/* Item 01: O Problema */}
            <div className="group space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest">
                <Target size={16} />
                01. {featuredProject.challengeTitle}
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featuredProject.problem}
              </p>
              <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium">
                {featuredProject.baselineLabel}: <span className="text-slate-900 dark:text-slate-200">{featuredProject.baseline}</span>
              </div>
            </div>

            {/* Item 02: A Engenharia */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest">
                <Zap size={16} />
                02. {featuredProject.solutionTitle}
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {featuredProject.solution}
              </p>
            </div>

            {/* Item 03: ROI / Impacto */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest">
                <BarChart3 size={16} />
                03. {featuredProject.impactTitle}
              </div>
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-2xl">
                <p className="text-emerald-900 dark:text-emerald-200 font-black text-xl md:text-2xl tracking-tight">
                  {featuredProject.result}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <a
                href={featuredProject.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-xl hover:shadow-blue-500/20"
              >
                {featuredProject.ctaLabel}
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

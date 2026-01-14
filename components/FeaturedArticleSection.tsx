import { Dictionary } from "@/lib/i18n";
import { Award, ExternalLink, Newspaper } from "lucide-react";

interface Props {
  dict: Dictionary["sections"];
  article: Dictionary["featuredArticle"];
}

export default function FeaturedArticleSection({ dict, article }: Props) {
  return (
    <section 
      aria-labelledby="featured-heading"
      className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/5 overflow-hidden group transition-all duration-500 hover:border-blue-500/30"
    >
      <div className="flex flex-col md:flex-row">
        {/* CONTEÚDO TEXTUAL */}
        <div className="flex-1 p-8 md:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <Award size={14} />
              {dict.featuredArticle}
            </span>
          </div>

          <h2 id="featured-heading" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {article.title}
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {article.description}
          </p>
          
          <div className="flex flex-wrap gap-4 py-2">
            {[article.award1, article.award2].map((award, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                <span className="shrink-0">⭐</span>
                {award}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-6">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {article.readOn}
            </span>
            
            <div className="flex items-center gap-6">
              <a href={article.links.dio} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors group/link">
                DIO <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
              </a>
              <a href={article.links.linkedin} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#0077b5] transition-colors group/link">
                LinkedIn <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
              </a>
              <a href={article.links.medium} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white transition-colors group/link">
                Medium <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
              </a>
            </div>
          </div>
        </div>
        
        {/* ÁREA VISUAL (TECHNICAL PREVIEW) */}
        <div className="w-full md:w-[35%] bg-slate-50 dark:bg-slate-800/50 p-8 flex items-center justify-center relative overflow-hidden border-l border-slate-100 dark:border-slate-800">
          {/* Decoração de Fundo (Grid de Dados) */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 w-full aspect-square max-w-[200px] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-6 transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500">
             <Newspaper size={64} className="text-blue-600 mb-4 opacity-20" />
             <div className="h-2 w-16 bg-blue-600/20 rounded-full mb-2" />
             <div className="h-2 w-12 bg-blue-600/10 rounded-full" />
             
             {/* Selo Flutuante */}
             <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl animate-pulse">
                <Award size={20} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

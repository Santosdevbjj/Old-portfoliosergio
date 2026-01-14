import { Mail, Linkedin, BookOpen, ExternalLink, Award } from "lucide-react";

interface FeaturedArticleSectionProps {
  title: string;
  article: {
    title: string;
    description: string;
    awards: string[];
    readOnLabel: string;
    links: {
      dio?: string;
      linkedin?: string;
      medium?: string;
    };
  };
  contact: {
    title: string;
    email: string;
    linkedin: string;
  };
  sectionId?: string;
}

export default function FeaturedArticleSection({
  title,
  article,
  contact,
  sectionId = "featured-article-section",
}: FeaturedArticleSectionProps) {
  
  // Filtra apenas links que possuem valor preenchido
  const availableLinks = [
    { label: "DIO", href: article.links.dio },
    { label: "LinkedIn", href: article.links.linkedin },
    { label: "Medium", href: article.links.medium },
  ].filter(link => !!link.href);

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className="
        relative overflow-hidden
        mb-16 rounded-[2.5rem]
        border border-slate-200 dark:border-slate-800/50
        bg-white dark:bg-slate-900/40
        p-8 md:p-12
        shadow-2xl shadow-slate-200/50 dark:shadow-none
      "
    >
      {/* Glow de Destaque */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Título da seção com Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500">
          <Award className="w-7 h-7" />
        </div>
        <h2
          id={`${sectionId}-title`}
          className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter"
        >
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
        {/* Coluna do Artigo (Principal) */}
        <div className="lg:col-span-3 space-y-8">
          <article className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              {article.title}
            </h3>

            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {article.description}
            </p>

            {/* Premiações Estilizadas como Badges de Engenharia */}
            {article.awards.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {article.awards.map((award, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-500/10"
                  >
                    <Award size={14} className="fill-amber-500/20" />
                    {award}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Links de Leitura com Validação */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
            <p className="mb-6 flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {article.readOnLabel}
            </p>
            <div className="flex flex-wrap gap-4">
              {availableLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3 px-6 py-3 rounded-2xl
                    bg-slate-50 dark:bg-slate-800/50 
                    text-slate-900 dark:text-slate-200
                    font-black text-xs uppercase tracking-widest transition-all
                    hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                    hover:scale-105 active:scale-95 shadow-sm
                  "
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna de Contato (Card de Networking) */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 p-8 border border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                {contact.title}
              </h3>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
              >
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">E-mail</span>
                <span className="text-slate-700 dark:text-slate-200 font-bold group-hover:text-blue-600 transition-colors break-all">
                  {contact.email}
                </h2>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
              >
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">LinkedIn</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-200 font-bold group-hover:text-blue-600 transition-colors">
                    {lang === 'pt' ? 'Conectar profissionalmente' : lang === 'es' ? 'Conectar profesionalmente' : 'Connect professionally'}
                  </span>
                  <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

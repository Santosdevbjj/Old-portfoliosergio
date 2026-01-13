import { Mail, Linkedin, BookOpen, ExternalLink, Award } from "lucide-react";

interface FeaturedArticleSectionProps {
  title: string;
  article: {
    title: string;
    description: string;
    awards: string[];
    readOnLabel: string;
    links: {
      dio: string;
      linkedin: string;
      medium: string;
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
  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className="
        relative overflow-hidden
        mb-16 rounded-3xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/50
        p-8 sm:p-10
        shadow-xl shadow-slate-200/50 dark:shadow-none
      "
    >
      {/* Detalhe visual de fundo (Sutil) */}
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Título da seção */}
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-8 h-8 text-amber-500" />
        <h2
          id={`${sectionId}-title`}
          className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Coluna do Artigo (3/5) */}
        <div className="lg:col-span-3 space-y-6">
          <article className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {article.title}
            </h3>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {article.description}
            </p>

            {/* Premiações Estilizadas */}
            {article.awards.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.awards.map((award, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200/50 dark:border-amber-700/30"
                  >
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Links de Leitura */}
          <div className="pt-4">
            <p className="mb-4 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {article.readOnLabel}
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "DIO", href: article.links.dio },
                { label: "LinkedIn", href: article.links.linkedin },
                { label: "Medium", href: article.links.medium },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-slate-100 dark:bg-slate-800 
                    text-slate-700 dark:text-slate-300
                    font-bold text-sm transition-all
                    hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                    hover:-translate-y-1
                  "
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna de Contato (2/5) - Card Interno */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-6 border border-slate-100 dark:border-slate-800">
            <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-slate-900 dark:text-white">
              <Mail className="w-5 h-5 text-blue-600" />
              {contact.title}
            </h3>

            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex flex-col p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">E-mail</span>
                <span className="text-slate-700 dark:text-slate-200 font-semibold group-hover:text-blue-600 break-all">
                  {contact.email}
                </span>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-200 font-semibold group-hover:text-blue-600">
                    Conectar no LinkedIn
                  </span>
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

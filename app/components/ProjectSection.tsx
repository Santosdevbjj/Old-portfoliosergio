import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Locale, Translations } from "@/lib/i18n";

interface ProjectSectionProps {
  title: string;
  repos: GitHubRepo[];
  lang: Locale;
  sectionId: string;
  dict: Translations["projects"];
}

export default function ProjectSection({
  title,
  repos,
  lang,
  sectionId,
  dict
}: ProjectSectionProps) {
  // Early return estratégico para não poluir o DOM
  if (!repos || repos.length === 0) return null;

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      lang={htmlLangMap[lang]}
      className="py-16 sm:py-24 animate-in fade-in duration-700"
    >
      {/* Header da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2
            id={`${sectionId}-heading`}
            className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            {title}
          </h2>
          <div className="h-2 w-24 bg-blue-600 rounded-full" />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {repos.length} {dict?.statsLabel || (lang === 'en' ? 'Items' : 'Itens')}
          </span>
        </div>
      </div>

      {/* Grid de Projetos */}
      <div
        className="
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          auto-rows-fr
        "
      >
        {repos.map((repo) => (
          <ProjectCard 
            key={repo.id} 
            repo={repo} 
            lang={lang}
            buttonLabel={dict?.viewProject || "View"}
            descriptionFallback={dict?.noDescription || "Details available on GitHub."}
            ariaLabel={`${dict?.viewProject || "View"} ${repo.name}`}
          />
        ))}
      </div>
    </section>
  );
}

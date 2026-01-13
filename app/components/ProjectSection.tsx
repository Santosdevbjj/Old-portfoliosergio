import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Locale, Translations } from "@/lib/i18n";

interface ProjectSectionProps {
  title: string;
  repos: GitHubRepo[];
  lang: Locale;
  sectionId: string;
  dict: Translations["projects"]; // Adicionado para passar as traduções aos cards
}

export default function ProjectSection({
  title,
  repos,
  lang,
  sectionId,
  dict
}: ProjectSectionProps) {
  // Early return: Se não houver repositórios, a seção nem aparece
  if (!repos || repos.length === 0) return null;

  const htmlLang = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";

  return (
    <section
      aria-labelledby={`${sectionId}-heading`}
      lang={htmlLang}
      className="py-12 sm:py-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <h2
          id={`${sectionId}-heading`}
          className="
            text-3xl sm:text-4xl font-black tracking-tighter
            text-slate-900 dark:text-white
            relative inline-block
          "
        >
          {title}
          <span className="block h-1.5 w-1/3 bg-blue-600 mt-2 rounded-full" />
        </h2>
        
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          {repos.length} {lang === 'en' ? 'Projects' : 'Projetos'}
        </span>
      </div>

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
            buttonLabel={dict?.viewProject || "GitHub"}
            descriptionFallback={dict?.noDescription || "Project details on GitHub."}
            ariaLabel={`${dict?.viewProject || "View"} ${repo.name}`}
          />
        ))}
      </div>
    </section>
  );
}

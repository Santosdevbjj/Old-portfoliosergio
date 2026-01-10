import type { GitHubRepo } from "@/lib/github";
import type { Locale, Translations } from "@/lib/i18n";

interface Props {
  repo: GitHubRepo;
  dict: Translations; // dicionário multilíngue completo
  lang: Locale;       // idioma atual (pt | en | es)
}

export default function ProjectCard({ repo, dict, lang }: Props) {
  // Traduções vindas do dicionário
  const buttonLabel =
    lang === "en"
      ? dict.portfolio?.buttonLabel ?? "View project →"
      : lang === "es"
      ? dict.portfolio?.buttonLabel ?? "Ver proyecto →"
      : dict.portfolio?.buttonLabel ?? "Ver projeto →";

  const descriptionFallback =
    lang === "en"
      ? "Description not available."
      : lang === "es"
      ? "Descripción no disponible."
      : "Descrição não disponível.";

  const ariaLabel =
    lang === "en"
      ? `View project ${repo.name} on GitHub`
      : lang === "es"
      ? `Ver proyecto ${repo.name} en GitHub`
      : `Ver projeto ${repo.name} no GitHub`;

  return (
    <article
      className="w-full p-4 sm:p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Nome do repositório */}
      <h3
        className="font-bold text-[clamp(1rem,2vw+0.5rem,1.25rem)] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-textGradient mb-2"
      >
        {repo.name}
      </h3>

      {/* Descrição multilíngue */}
      <p className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600 dark:text-gray-300 mb-4">
        {repo.description || descriptionFallback}
      </p>

      {/* Botão multilíngue */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="inline-block px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
      >
        {buttonLabel}
      </a>
    </article>
  );
}

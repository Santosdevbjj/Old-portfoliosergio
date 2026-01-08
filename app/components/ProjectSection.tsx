import ProjectCard from './ProjectCard';
import { GitHubRepo } from '@/lib/github';
import { Dictionary } from '@/lib/i18n';

interface Props {
  techKey: string;          // chave da tecnologia (ex.: "python", "aws")
  repos: GitHubRepo[];      // lista de repositórios filtrados
  dict: Dictionary;         // dicionário multilíngue carregado dinamicamente
  lang: 'pt' | 'en';        // idioma atual
}

export default function ProjectSection({ techKey, repos, dict, lang }: Props) {
  if (!repos || repos.length === 0) return null;

  // Obtém título traduzido diretamente do dicionário
  const title = dict.categories?.[techKey] ?? techKey.replace(/-/g, ' ');

  return (
    <section
      className="mb-8 sm:mb-12 px-4"
      aria-label={lang === 'en' ? `Project section: ${title}` : `Seção de projetos: ${title}`}
      lang={lang === 'en' ? 'en-US' : 'pt-BR'}
    >
      <h2 className="font-bold mb-6 text-[clamp(1.5rem,3vw+1rem,2.5rem)] text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}

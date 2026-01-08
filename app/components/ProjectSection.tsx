import ProjectCard from './ProjectCard';
import { GitHubRepo } from '@/lib/github';

interface Props {
  title: string;
  repos: GitHubRepo[];
}

export default function ProjectSection({ title, repos }: Props) {
  if (!repos || repos.length === 0) return null;

  return (
    <section
      className="mb-8 sm:mb-12 px-4"
      aria-label={`Project section: ${title}`}
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

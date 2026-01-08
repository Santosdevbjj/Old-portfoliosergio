import ProjectCard from './ProjectCard';
import { GitHubRepo } from '@/lib/github';

interface Props {
  title: string;
  repos: GitHubRepo[];
}

export default function ProjectSection({ title, repos }: Props) {
  if (!repos || repos.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}

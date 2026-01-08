import { GitHubRepo } from "@/lib/github";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <article className="border rounded-lg p-4 transition hover:shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {repo.description || "Descrição não disponível."}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 hover:underline font-medium"
      >
        Ver projeto →
      </a>
    </article>
  );
}

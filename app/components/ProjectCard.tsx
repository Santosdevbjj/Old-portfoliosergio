import { GitHubRepo } from "@/lib/github";

export default function ProjectCard({ repo }: { repo: GitHubRepo }) {
  return (
    <article className="border border-gray-700 dark:border-gray-600 rounded-xl p-4 shadow-lg transition-transform hover:scale-105 bg-gray-900 dark:bg-gray-800">
      <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{repo.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{repo.description || "Descrição não disponível."}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-transform">
        Ver projeto →
      </a>
    </article>
  );
}

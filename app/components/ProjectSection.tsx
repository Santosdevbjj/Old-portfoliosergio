import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "@/lib/github";

export default function ProjectSection({ title, repos }: { title: string; repos: GitHubRepo[] }) {
  if (!repos.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)}
      </div>
    </section>
  );
}

import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "@/lib/github";

interface ProjectSectionProps {
  title: string;
  repos: GitHubRepo[];
}

export default function ProjectSection({ title, repos }: ProjectSectionProps) {
  if (!repos || repos.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-textGradient">
        {title}
      </h2>

      <div className="
        grid gap-6 sm:grid-cols-2 lg:grid-cols-3
        animate-fadeIn
      ">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}

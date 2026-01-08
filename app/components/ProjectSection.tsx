// app/components/ProjectSection.tsx
import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "@/lib/github";

interface ProjectSectionProps {
  title: string;
  repos: GitHubRepo[];
}

export default function ProjectSection({
  title,
  repos,
}: ProjectSectionProps) {
  if (!repos || repos.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold mb-6
                     bg-clip-text text-transparent
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-textGradient">
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

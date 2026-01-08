import ProjectCard from "./ProjectCard";
import { GitHubRepo } from "@/lib/github";

type Props = {
  title: string;
  repos: GitHubRepo[];
};

export default function ProjectSection({ title, repos }: Props) {
  if (repos.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}

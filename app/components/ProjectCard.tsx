"use client";
import { GitHubRepo } from "@/lib/github";

type Props = {
  repo: GitHubRepo;
};

export default function ProjectCard({ repo }: Props) {
  const screenshotUrl = `https://opengraph.githubassets.com/1/${repo.html_url.replace(
    "https://github.com/",
    ""
  )}`;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-900">
      <img
        src={screenshotUrl}
        alt={repo.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{repo.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {repo.description}
        </p>

        <a
          href={repo.html_url}
          target="_blank"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Ver no GitHub →
        </a>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";
import type { Translations, Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Translations;
  projects: GitHubRepo[];
}

export default function ProjectsSection({ locale, dict, projects }: Props) {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="featured-projects"
      role="region"
      aria-labelledby="projects-title"
      className="
        max-w-7xl mx-auto
        px-4 lg:px-8
        py-12 sm:py-20
        space-y-10
      "
    >
      {/* TÍTULO */}
      <h2
        id="projects-title"
        className="
          text-3xl sm:text-4xl
          font-bold
          text-slate-900 dark:text-slate-100
          text-center
        "
      >
        {dict.sections.projectsTitle}
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((repo) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
            dict={dict}
            lang={locale}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href={`/${locale}/projects/list`}
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-xl
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white font-semibold
            hover:scale-105
            transition-transform
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          "
        >
          {dict.sections.viewAllProjects} →
        </Link>
      </div>
    </section>
  );
}

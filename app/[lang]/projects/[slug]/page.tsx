import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, listSlugsByLang, type Lang } from "@/lib/mdx";

interface PageProps {
  params: { lang: Lang; slug: string };
}

export async function generateStaticParams() {
  const langs: Lang[] = ["pt", "en", "es"];
  const params: { lang: Lang; slug: string }[] = [];

  for (const lang of langs) {
    const slugs = await listSlugsByLang(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug, params.lang);

  if (!project) return notFound();

  return (
    <article className="container py-10 space-y-6">
      <header>
        <h1 className="animate-textGradient mb-2 font-bold text-[clamp(2rem,4vw,3rem)]">
          {project.metadata.title}
        </h1>
        {project.metadata.date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.metadata.date}
          </p>
        )}
        {project.metadata.description && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {project.metadata.description}
          </p>
        )}
      </header>

      <div className="prose prose-technical dark:prose-darkTechnical max-w-none">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}

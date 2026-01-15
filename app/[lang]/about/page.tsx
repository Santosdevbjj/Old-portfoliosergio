import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import { i18n, getDictionary } from "@/lib/i18n";

const ABOUT_SLUG = "about";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang } = await props.params;

  if (!i18n.locales.includes(lang)) {
    return {};
  }

  const about = await getProjectBySlug(ABOUT_SLUG, lang);
  const t = await getDictionary(lang);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfoliosergiosantos.vercel.app";

  if (!about) {
    return {
      title: t.sections.about,
      metadataBase: new URL(baseUrl),
    };
  }

  return {
    title: `${about.metadata.title} | Sérgio Santos`,
    description: about.metadata.description || t.portfolio.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/about`,
      languages: {
        pt: `${baseUrl}/pt/about`,
        en: `${baseUrl}/en/about`,
        es: `${baseUrl}/es/about`,
      },
    },
    openGraph: {
      title: about.metadata.title,
      description: about.metadata.description || t.portfolio.description,
      url: `${baseUrl}/${lang}/about`,
      siteName: "Sérgio Santos Portfolio",
      locale:
        lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "profile",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: "Bio profissional de Sérgio Santos",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AboutPage(props: PageProps) {
  const { lang } = await props.params;

  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  const t = await getDictionary(lang);
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      <div className="container mx-auto max-w-4xl px-6 pt-8">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t.common.back}
        </Link>
      </div>

      <div className="py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
            {about.metadata.title}
          </h1>
          <div className="h-2 w-20 bg-blue-600 mt-8 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 pb-24">
        <article className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
          <MDXRemote source={about.content} />
        </article>
      </div>
    </main>
  );
}

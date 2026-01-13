import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import { i18n } from "@/lib/i18n";

const ABOUT_SLUG = "about";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico: Focado em Autoridade Profissional */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang } = await props.params;
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) {
    return { title: "Sobre | Sérgio Santos" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";
  const path = "/about";

  return {
    title: `${about.metadata.title} | Sérgio Santos`,
    description: about.metadata.description || "Trajetória profissional, especialização em sistemas bancários e transição para Ciência de Dados.",
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        "pt": `${baseUrl}/pt${path}`,
        "en": `${baseUrl}/en${path}`,
        "es": `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      title: about.metadata.title,
      description: about.metadata.description,
      url: `${baseUrl}/${lang}${path}`,
      siteName: "Sérgio Santos Portfolio",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "profile", // Define como perfil profissional para motores de busca
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: `Bio profissional de Sérgio Santos`,
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
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header da Página: Título vindo do MDX */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {about.metadata.title}
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-8 rounded-full" />
        </div>
      </div>

      {/* Conteúdo MDX com Tailwind Typography */}
      <div className="container mx-auto max-w-4xl px-6 py-16">
        <article 
          className="
            prose prose-lg md:prose-xl prose-slate dark:prose-invert 
            max-w-none 
            prose-headings:font-black prose-headings:tracking-tight
            prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
            prose-img:rounded-3xl prose-img:shadow-2xl
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
          "
        >
          <MDXRemote source={about.content} />
        </article>
      </div>
    </main>
  );
}

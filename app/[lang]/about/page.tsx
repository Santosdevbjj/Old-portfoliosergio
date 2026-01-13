import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProjectBySlug, type Lang } from "@/lib/mdx";
import { i18n } from "@/lib/i18n";

// Slug fixo para buscar o arquivo MDX correspondente
const ABOUT_SLUG = "about";

interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/** 🔎 SEO Dinâmico e Internacionalizado */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang } = await props.params;
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  if (!about) {
    return { title: "About | Sérgio Santos" };
  }

  const baseUrl = "https://portfoliosergiosantos.vercel.app";
  const path = "/about";

  return {
    title: `${about.metadata.title} | Sérgio Santos`,
    description: about.metadata.description || "Biografia profissional e trajetória técnica de Sérgio Santos.",
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
      siteName: "Portfólio Sérgio Santos",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "profile",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: about.metadata.title,
        },
      ],
    },
  };
}

/** 🚀 Gera os caminhos estáticos para cada idioma durante o Build (SSG) */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AboutPage(props: PageProps) {
  const { lang } = await props.params;
  
  // Busca o conteúdo MDX baseado no idioma e slug "about"
  const about = await getProjectBySlug(ABOUT_SLUG, lang);

  // Se o arquivo mdx/[lang]/about.mdx não existir, retorna 404
  if (!about) return notFound();

  return (
    <main className="container mx-auto max-w-4xl px-6 py-12 md:py-24 min-h-screen">
      <article 
        className="
          prose prose-slate dark:prose-invert 
          max-w-none 
          prose-headings:font-bold
          prose-img:rounded-3xl prose-img:shadow-xl
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800/50
          prose-pre:rounded-2xl
        "
      >
        {/* Renderiza o conteúdo MDX de forma segura no servidor */}
        <MDXRemote source={about.content} />
      </article>
    </main>
  );
}

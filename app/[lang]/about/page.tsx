import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getProjectBySlug, type Lang } from "@/lib/mdx";

// Reutilizamos getProjectBySlug, pois o padrão é slug único
// Aqui o slug é "about"

interface PageProps {
  params: { lang: Lang };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;
  const about = await getProjectBySlug("about", lang);

  if (!about) {
    return {
      title: "Página não encontrada",
      description: "Conteúdo indisponível.",
    };
  }

  const baseUrl = "https://seusite.com";
  const path = "/about";

  return {
    title: about.metadata.title,
    description: about.metadata.description ?? "Biografia multilíngue de Sergio Santos",
    alternates: {
      canonical: `${baseUrl}/${lang}${path}`,
      languages: {
        "pt-BR": `${baseUrl}/pt${path}`,
        "en-US": `${baseUrl}/en${path}`,
        "es-ES": `${baseUrl}/es${path}`,
      },
    },
    openGraph: {
      title: about.metadata.title,
      description: about.metadata.description ?? "Biografia multilíngue de Sergio Santos",
      url: `${baseUrl}/${lang}${path}`,
      siteName: "Portfólio Sergio Santos",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
      type: "profile",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: about.metadata.title,
      description: about.metadata.description ?? "Biografia multilíngue de Sergio Santos",
      images: ["/og-image.png"],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const about = await getProjectBySlug("about", params.lang);
  if (!about) return notFound();

  return (
    <article className="container py-10 space-y-6 prose prose-technical dark:prose-darkTechnical max-w-none">
      <MDXRemote source={about.content} />
    </article>
  );
}

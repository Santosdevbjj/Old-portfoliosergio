import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { Metadata } from "next";
import { i18n } from "@/lib/i18n";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    lang: Lang;
    slug: string;
  }>;
}

/** 🚀 SSG: Garante que os estudos de caso sejam ultra-rápidos */
export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    const projects = await getAllProjects(locale as Lang);
    projects.forEach((project) => {
      paths.push({ lang: locale, slug: project.slug });
    });
  }
  return paths;
}

/** 🔎 SEO: Metadados focados em Projetos Técnicos */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = await getProjectBySlug(slug, lang);
  
  if (!project) return { title: "Projeto não encontrado | Sérgio Santos" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";

  return {
    title: `${project.metadata.title} | Sérgio Santos`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      type: "article",
      url: `${baseUrl}/${lang}/projects/${slug}`,
      images: [{ url: `/og-image-${lang}.png`, width: 1200, height: 630 }],
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "pt_BR",
    },
  };
}

const languageTip = {
  en: "Use the LanguageSwitcher to view this project in other languages.",
  es: "Usa el LanguageSwitcher para ver este proyecto en otros idiomas.",
  pt: "Use o LanguageSwitcher para ver este projeto em outros idiomas.",
};

export default async function ProjectPage(props: PageProps) {
  const { slug, lang } = await props.params;
  const project = await getProjectBySlug(slug, lang);

  if (!project) return notFound();

  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <main
      lang={htmlLangMap[lang]}
      className="min-h-screen bg-white dark:bg-slate-950"
    >
      {/* Navegação Superior */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href={`/${lang}#projects`}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:opacity-70 transition-all"
          >
            <ArrowLeft size={16} />
            {lang === "pt" ? "Ver todos os projetos" : lang === "es" ? "Ver todos los proyectos" : "All projects"}
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* HEADER DO CASE STUDY */}
        <header className="space-y-8 mb-16">
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter">
              {project.metadata.tags?.[0] || "Case Study"}
            </span>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Clock size={12} /> 5 min read
            </span>
          </div>

          <h1 className="font-black text-4xl md:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {project.metadata.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
            {project.metadata.date && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <time>{project.metadata.date}</time>
              </div>
            )}
          </div>

          {project.metadata.description && (
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-3xl">
              {project.metadata.description}
            </p>
          )}
        </header>

        {/* CONTEÚDO TÉCNICO MDX */}
        <section className="
          prose prose-slate dark:prose-invert 
          max-w-none 
          prose-lg md:prose-xl
          prose-headings:font-black prose-headings:tracking-tight
          prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-pre:bg-slate-900 dark:prose-pre:bg-slate-900/90
          prose-pre:rounded-3xl prose-pre:shadow-2xl prose-pre:border prose-pre:border-slate-800
          prose-img:rounded-[2rem] prose-img:shadow-2xl
          prose-strong:text-slate-900 dark:prose-strong:text-white
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1 prose-code:rounded
        ">
          <MDXRemote 
            source={project.content} 
            components={{
              Callout: CalloutPersistent 
            }}
          />
        </section>

        {/* FOOTER DO PROJETO */}
        <footer className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] p-8 md:p-12 text-center">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {lang === "pt" ? "Interessado nesta solução?" : lang === "es" ? "¿Interesado en esta solución?" : "Interested in this solution?"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
              {languageTip[lang]}
            </p>
            <Link 
              href={`/${lang}#contact`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-500/20"
            >
              {lang === "pt" ? "Vamos conversar" : lang === "es" ? "Hablemos" : "Let's Talk"}
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

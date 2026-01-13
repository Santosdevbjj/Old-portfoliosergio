import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { Metadata } from "next";
import { i18n } from "@/lib/i18n";

interface PageProps {
  params: Promise<{
    lang: Lang;
    slug: string;
  }>;
}

/** 🚀 Gera caminhos estáticos no Build Time (Performance Sênior) */
export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];

  // Percorre cada idioma e cada projeto para criar a lista de URLs estáticas
  for (const locale of i18n.locales) {
    const projects = await getAllProjects(locale as Lang);
    projects.forEach((project) => {
      paths.push({
        lang: locale,
        slug: project.slug,
      });
    });
  }

  return paths;
}

/** 🔎 SEO Dinâmico e Social Media Ready */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = await getProjectBySlug(slug, lang);
  
  if (!project) return { title: "Projeto não encontrado | Sérgio Santos" };

  return {
    title: `${project.metadata.title} | Sérgio Santos`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      type: "article",
      images: [`/og-image-${lang}.png`],
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
      className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-24 min-h-screen"
    >
      <article className="space-y-12">
        {/* HEADER TÉCNICO: Foco em Legibilidade */}
        <header className="space-y-8 border-b border-slate-200 dark:border-slate-800 pb-12">
          <div className="space-y-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
              {lang}
            </span>
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-tight">
              {project.metadata.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {project.metadata.date && (
              <time dateTime={project.metadata.date}>
                {new Date(project.metadata.date).toLocaleDateString(htmlLangMap[lang], {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </time>
            )}
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-blue-400">
               Documentação Técnica
            </span>
          </div>

          {project.metadata.description && (
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {project.metadata.description}
            </p>
          )}
        </header>

        {/* CONTEÚDO MDX: Estilizado para Código e Dados */}
        <section className="
          prose prose-slate dark:prose-invert 
          max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-pre:bg-slate-900 dark:prose-pre:bg-slate-900/80
          prose-pre:border prose-pre:border-slate-800
          prose-pre:rounded-2xl
          prose-img:rounded-3xl prose-img:shadow-2xl
        ">
          <MDXRemote 
            source={project.content} 
            components={{
              Callout: CalloutPersistent 
            }}
          />
        </section>

        {/* FOOTER: Dica de Internacionalização */}
        <footer className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <CalloutPersistent id={`lang-tip-${slug}`} type="info" lang={lang}>
            {languageTip[lang]}
          </CalloutPersistent>
        </footer>
      </article>
    </main>
  );
}

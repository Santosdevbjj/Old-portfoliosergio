import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects, type Lang } from "@/lib/mdx";
import CalloutPersistent from "@/components/CalloutPersistent";
import { Metadata } from "next";
import { i18n, getDictionary } from "@/lib/i18n";
import { Calendar, ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ lang: Lang; slug: string }>;
}

/** 🚀 SSG: Pré-renderização de todos os estudos de caso */
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

/** 🔎 SEO: Metadados Estruturados para Engenharia */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = await getProjectBySlug(slug, lang);
  
  if (!project) return { title: "Projeto não encontrado" };

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

export default async function ProjectPage(props: PageProps) {
  const { slug, lang } = await props.params;
  const t = await getDictionary(lang);
  const project = await getProjectBySlug(slug, lang);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Navegação Secundária - Sticky sub-header */}
      <div className="sticky top-[72px] z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href={`/${lang}#featuredProjects`}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {t.common.back}
          </Link>
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
            Case Study
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* HEADER DO CASE STUDY */}
        <header className="space-y-8 mb-16">
          <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-blue-600" />
              {project.metadata.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> 5 min read
            </span>
          </div>

          <h1 className="font-black text-4xl md:text-7xl tracking-tighter text-slate-900 dark:text-white leading-none">
            {project.metadata.title}
          </h1>

          {project.metadata.description && (
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-3xl border-l-4 border-blue-600 pl-6">
              {project.metadata.description}
            </p>
          )}
        </header>

        {/* CONTEÚDO TÉCNICO MDX */}
        
        <section className="
          prose prose-slate dark:prose-invert 
          max-w-none 
          prose-lg md:prose-xl
          prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-white
          prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
          prose-strong:text-blue-600 dark:prose-strong:text-blue-400
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-pre:bg-slate-900 dark:prose-pre:bg-slate-900
          prose-pre:rounded-[2rem] prose-pre:shadow-2xl
          prose-img:rounded-[2.5rem] prose-img:shadow-2xl
          prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:rounded-md
        ">
          <MDXRemote 
            source={project.content} 
            components={{
              Callout: CalloutPersistent 
            }}
          />
        </section>

        {/* FOOTER DO PROJETO */}
        <footer className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-16 text-center border border-slate-100 dark:border-slate-800/50">
            <div className="inline-flex p-4 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-500/30">
              <Share2 size={24} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
              {t.footer.contact}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto font-medium">
              {lang === "pt" 
                ? "Este projeto resolveu um desafio real de engenharia. Vamos discutir como aplicar soluções similares?" 
                : "This project solved a real engineering challenge. Let's discuss how to apply similar solutions?"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lang}#contact`}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-blue-500/20"
              >
                {t.cta.hireMe}
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}

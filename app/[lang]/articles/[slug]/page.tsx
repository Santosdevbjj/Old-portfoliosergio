import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MdxContent from "@/components/MdxContent";
import { i18n, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

/** 🚀 Gera os caminhos estáticos no Build (Performance Máxima) */
export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];

  i18n.locales.forEach((lang) => {
    const contentPath = path.join(process.cwd(), "content", lang);
    
    if (fs.existsSync(contentPath)) {
      const files = fs.readdirSync(contentPath).filter(file => file.endsWith(".mdx"));
      files.forEach((file) => {
        paths.push({
          lang,
          slug: file.replace(".mdx", ""),
        });
      });
    }
  });

  return paths;
}

/** 🔎 SEO Dinâmico para os Artigos */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const filePath = path.join(process.cwd(), "content", lang, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return { title: "Artigo não encontrado" };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContent);

  return {
    title: `${frontmatter.title} | Sérgio Santos`,
    description: frontmatter.description || frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.date,
      images: [`/og-image-${lang}.png`],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  
  const filePath = path.join(process.cwd(), "content", lang, `${slug}.mdx`);

  // Verificação de segurança para evitar quebra de build
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data: frontmatter } = matter(fileContent);

    return (
      <main className="min-h-screen bg-white dark:bg-slate-950">
        <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                {frontmatter.category || "Engenharia de Dados"}
              </span>
              <span className="text-slate-400 text-sm">{frontmatter.date}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              {frontmatter.title}
            </h1>
            
            {frontmatter.description && (
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {frontmatter.description}
              </p>
            )}
          </header>

          <section className="prose prose-slate dark:prose-invert max-w-none">
            <MdxContent source={content} />
          </section>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Erro ao ler arquivo MDX:", error);
    notFound();
  }
}

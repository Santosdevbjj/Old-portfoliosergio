import { getDictionary } from "@/lib/i18n";
import MdxContent from "@/components/MdxContent";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  
  // Caminho para os arquivos MDX (ex: content/en/meu-artigo.mdx)
  const filePath = path.join(process.cwd(), "content", lang, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data: frontmatter } = matter(fileContent);

  return (
    <article className="max-w-4xl mx-auto px-4 py-24">
      <header className="mb-12">
        <h1 className="text-4xl font-black mb-4">{frontmatter.title}</h1>
        <div className="flex gap-4 text-slate-500 text-sm">
          <span>{frontmatter.date}</span>
          <span>•</span>
          <span className="font-bold text-blue-600">{frontmatter.category}</span>
        </div>
      </header>

      <MdxContent source={content} />
    </article>
  );
}

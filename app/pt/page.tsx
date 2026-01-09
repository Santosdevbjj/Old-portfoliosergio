// app/pt/page.tsx
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/ProjectSection";
import { translations } from "@/lib/i18n";
import { getPortfolioRepos } from "@/lib/github";

interface Props {
  params: { lang: "pt" | "en" };
}

export default async function Page({ params }: Props) {
  const t = translations[params.lang];
  const repos = await getPortfolioRepos();

  return (
    <PageWrapper>
      <Header lang={params.lang} />
      <main className="flex-1 p-4 max-w-7xl mx-auto">
        
        {/* Apresentação Pessoal */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">👨‍💻 {t.sections.aboutTitle}</h1>
          <p className="text-lg">{t.sections.aboutIntro}</p>
          <p className="mt-2 text-base">{t.sections.aboutDetails}</p>
        </section>

        {/* Artigo Vencedor */}
        <section className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">🏆 {t.sections.featuredArticle}</h2>
          <h3 className="text-xl font-bold mb-2">
            Low-Code na Saúde: Como Criar Apps Médicos em Semanas
          </h3>
          <p className="mb-2">
            Análise sobre aplicação de plataformas low-code no setor de saúde, abordando benefícios,
            desafios e casos de uso práticos para desenvolvimento acelerado de aplicações médicas.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>🏆 Vencedor da 35ª Competição de Artigos DIO</li>
            <li>🏆 Melhor Artigo do Mês - Setembro 2025</li>
          </ul>
          <p className="mb-2">Você pode ler o artigo nas plataformas:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a?back=/articles"
                 target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:underline">
                DIO
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/pulse/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-luiz-dos-santos-xen7e"
                 target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://medium.com/@sergioluiz.santos/low-code-na-sa%C3%BAde-como-criar-apps-m%C3%A9dicos-em-semanas-1c6f05c2c89e"
                 target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:underline">
                Medium
              </a>
            </li>
          </ul>

          {/* Contatos diretos */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">📧 Contato direto</h3>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:santossergiorealbjj@outlook.com"
                   className="text-blue-600 hover:underline">
                  santossergiorealbjj@outlook.com
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/santossergioluiz"
                   target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:underline">
                  linkedin.com/in/santossergioluiz
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Projetos por tecnologia */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📂 {t.sections.projectsTitle}</h2>
          {[
            "Ciência de Dados",
            "Azure Databricks",
            "Neo4J",
            "Power BI e Análise de Dados",
            "Banco de Dados",
            "Python",
            "C#/dotnet .NET",
            "Java",
            "Machine Learning",
            "Amazon AWS",
            "Cibersegurança",
            "Lógica de Programação",
            "HTML",
            "Repositório de Artigos Técnicos"
          ].map((cat) => (
            <ProjectSection key={cat} title={cat} projects={repos[cat] || []} />
          ))}
        </section>
      </main>
      <Footer lang={params.lang} dict={t} />
    </PageWrapper>
  );
}

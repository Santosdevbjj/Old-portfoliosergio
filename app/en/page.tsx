// app/en/page.tsx
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/ProjectSection";
import { translations } from "@/lib/i18n";
import { getPortfolioRepos, Category, CATEGORIES_ORDER, GitHubRepo } from "@/lib/github";

interface Props {
  params: { lang: "pt" | "en" | "es" };
}

export default async function Page({ params }: Props) {
  const t = translations[params.lang];
  const repos = await getPortfolioRepos();

  // Mapa de correspondência entre categorias (kebab-case) e traduções
  const categoryMap: Record<Category, string> = {
    "data-science": t.projectCategories.dataScience,
    "azure-databricks": t.projectCategories.azureDatabricks,
    "neo4j": t.projectCategories.neo4j,
    "power-bi": t.projectCategories.powerBI,
    "database": t.projectCategories.database,
    "python": t.projectCategories.python,
    "csharp": t.projectCategories.dotnet,
    "dotnet": t.projectCategories.dotnet,
    "java": t.projectCategories.java,
    "machine-learning": t.projectCategories.machineLearning,
    "amazon-aws": t.projectCategories.aws,
    "cybersecurity": t.projectCategories.cybersecurity,
    "programming-logic": t.projectCategories.logic,
    "html": t.projectCategories.html,
    "articles-repo": t.projectCategories.articlesRepo,
  };

  return (
    <PageWrapper>
      <Header lang={params.lang} />
      <main className="flex-1 p-4 max-w-7xl mx-auto">
        
        {/* Personal Introduction */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">👨‍💻 {t.sections.aboutTitle}</h1>
          <p className="text-lg">{t.sections.aboutIntro}</p>
          <p className="mt-2 text-base">{t.sections.aboutDetails}</p>
        </section>

        {/* Featured Article */}
        <section className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">🏆 {t.sections.featuredArticle}</h2>
          <h3 className="text-xl font-bold mb-2">{t.featuredArticle.title}</h3>
          <p className="mb-2">{t.featuredArticle.description}</p>
          <ul className="list-disc list-inside mb-4">
            <li>{t.featuredArticle.award1}</li>
            <li>{t.featuredArticle.award2}</li>
          </ul>
          <p className="mb-2">{t.featuredArticle.readOn}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href={t.featuredArticle.links.dio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                DIO
              </a>
            </li>
            <li>
              <a href={t.featuredArticle.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={t.featuredArticle.links.medium} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Medium
              </a>
            </li>
          </ul>

          {/* Direct Contacts */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">📧 {t.sections.contactTitle}</h3>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:santossergiorealbjj@outlook.com" className="text-blue-600 hover:underline">
                  santossergiorealbjj@outlook.com
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/santossergioluiz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  linkedin.com/in/santossergioluiz
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Projects by Technology */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📂 {t.sections.projectsTitle}</h2>
          {(Object.entries(repos) as [Category, GitHubRepo[]][])
            .sort(([a], [b]) => CATEGORIES_ORDER.indexOf(a) - CATEGORIES_ORDER.indexOf(b))
            .map(([cat, projects]) => (
              <ProjectSection key={cat} title={categoryMap[cat] || cat} projects={projects} />
            ))}
        </section>
      </main>
      <Footer lang={params.lang} dict={t} />
    </PageWrapper>
  );
}

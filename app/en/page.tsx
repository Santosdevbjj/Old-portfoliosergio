// app/en/page.tsx
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
        
        {/* Personal Introduction */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">👨‍💻 {t.sections.aboutTitle}</h1>
          <p className="text-lg">{t.sections.aboutIntro}</p>
          <p className="mt-2 text-base">{t.sections.aboutDetails}</p>
        </section>

        {/* Featured Article */}
        <section className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">🏆 {t.sections.featuredArticle}</h2>
          <h3 className="text-xl font-bold mb-2">
            Low-Code in Healthcare: How to Build Medical Apps in Weeks
          </h3>
          <p className="mb-2">
            Analysis of the application of low-code platforms in the healthcare sector, addressing benefits,
            challenges, and practical use cases for accelerated development of medical applications.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>🏆 Winner of the 35th DIO Article Competition</li>
            <li>🏆 Best Article of the Month – September 2025</li>
          </ul>
          <p className="mb-2">You can read the article on the following platforms:</p>
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

          {/* Direct Contacts */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">📧 Direct Contact</h3>
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

        {/* Projects by Technology */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📂 {t.sections.projectsTitle}</h2>
          {[
            "Data Science",
            "Azure Databricks",
            "Neo4J",
            "Power BI & Data Analysis",
            "Databases",
            "Python",
            "C#/dotnet .NET",
            "Java",
            "Machine Learning",
            "Amazon AWS",
            "Cybersecurity",
            "Programming Logic",
            "HTML",
            "Technical Articles Repository"
          ].map((cat) => (
            <ProjectSection key={cat} title={cat} projects={repos[cat] || []} />
          ))}
        </section>
      </main>
      <Footer lang={params.lang} dict={t} />
    </PageWrapper>
  );
}

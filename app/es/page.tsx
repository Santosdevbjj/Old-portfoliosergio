// app/es/page.tsx
import PageWrapper from "@/components/PageWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSection from "@/components/ProjectSection";
import { translations } from "@/lib/i18n";
import { getPortfolioRepos } from "@/lib/github";

export default async function Page() {
  const t = translations["es"]; // usamos o locale espanhol
  const repos = await getPortfolioRepos();

  return (
    <PageWrapper>
      <Header lang="es" />
      <main className="flex-1 p-4 max-w-7xl mx-auto">
        
        {/* Introducción */}
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {t.sections.aboutTitle}
          </h1>
          <p className="text-lg sm:text-xl">{t.sections.aboutIntro}</p>
          <p className="mt-2 text-base sm:text-lg">{t.sections.aboutDetails}</p>
        </section>

        {/* Experiencia Técnica */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.sections.experienceTitle}</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>{t.experience.item1}</li>
            <li>{t.experience.item2}</li>
            <li>{t.experience.item3}</li>
          </ul>
          <p className="mt-2 text-base">
            <strong>{t.sections.stackConsolidated}:</strong> {t.experience.stackConsolidated}
          </p>
          <p className="mt-1 text-base">
            <strong>{t.sections.stackUpdating}:</strong> {t.experience.stackUpdating}
          </p>
        </section>

        {/* Proyectos */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            📂 {t.sections.projectsTitle}
          </h2>
          {Object.entries(repos).map(([cat, projects]) => (
            <ProjectSection key={cat} title={t.projectCategories[cat as keyof typeof t.projectCategories] || cat} projects={projects} />
          ))}
        </section>

        {/* Artículo destacado */}
        <section className="mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            🏆 {t.sections.featuredArticle}
          </h2>
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
        </section>
      </main>
      <Footer lang="es" dict={t} />
    </PageWrapper>
  );
}

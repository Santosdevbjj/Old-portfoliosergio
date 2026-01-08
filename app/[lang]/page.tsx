import { getPortfolioRepos } from "@/lib/github";
import { getDictionary } from "@/lib/i18n";
import ProjectSection from "../components/ProjectSection";
import { TECHNOLOGY_ORDER } from "@/lib/i18n";

export default async function Page() {
  const repos = await getPortfolioRepos();

  return (
    <main className="container mx-auto px-4 py-12">
      {TECHNOLOGY_ORDER.map((tech) => (
        <ProjectSection
          key={tech}
          title={tech.replace("-", " ").toUpperCase()}
          repos={repos.filter((r) => r.topics.includes(tech))}
        />
      ))}
    </main>
  );
}

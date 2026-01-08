import { notFound } from 'next/navigation';
import { getPortfolioRepos, GitHubRepo } from '@/lib/github';
import { getDictionary, TECHNOLOGY_ORDER } from '@/lib/i18n';
import ProjectSection from '../components/ProjectSection';
import PageWrapper from '../components/PageWrapper';

interface PageProps {
  params: { lang: string };
}

const SUPPORTED_LANGS = ['pt', 'en'] as const;

export default async function Page({ params }: PageProps) {
  const { lang } = params;

  if (!SUPPORTED_LANGS.includes(lang as any)) {
    notFound();
  }

  const [repos, dict] = await Promise.all([getPortfolioRepos(), getDictionary(lang)]);

  return (
    <PageWrapper>
      <section className="container mx-auto px-4 py-12 space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">{dict.portfolio.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl sm:text-lg leading-relaxed">{dict.portfolio.description}</p>
        </header>

        {TECHNOLOGY_ORDER.map((tech) => {
          const filteredRepos = repos.filter((r: GitHubRepo) => r.topics?.includes(tech));
          if (!filteredRepos.length) return null;

          return <ProjectSection key={tech} title={dict.categories?.[tech] ?? tech.replace(/-/g, ' ').toUpperCase()} repos={filteredRepos} />;
        })}
      </section>
    </PageWrapper>
  );
}

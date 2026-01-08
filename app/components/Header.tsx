'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname() ?? '';
  const currentLang = pathname.startsWith('/en') ? 'en' : 'pt';

  const getLinkClass = (lang: 'pt' | 'en') =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      currentLang === lang
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="bg-gray-100 dark:bg-gray-900 shadow-sm">
      <nav className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-2">
          <Link href="/pt" className={getLinkClass('pt')} aria-current={currentLang === 'pt' ? 'page' : undefined}>
            Português
          </Link>
          <Link href="/en" className={getLinkClass('en')} aria-current={currentLang === 'en' ? 'page' : undefined}>
            English
          </Link>
        </div>
        <span className="text-xs uppercase tracking-widest font-medium text-gray-500 dark:text-gray-400">
          {currentLang === 'en' ? 'International' : 'Brasil'}
        </span>
      </nav>
    </header>
  );
}

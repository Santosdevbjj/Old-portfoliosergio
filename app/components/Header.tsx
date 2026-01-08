'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dictionary } from '@/lib/i18n';

interface Props {
  dict: Dictionary;   // dicionário multilíngue carregado dinamicamente
  lang: 'pt' | 'en';  // idioma atual
}

export default function Header({ dict, lang }: Props) {
  const pathname = usePathname() ?? '';
  const currentLang: 'pt' | 'en' = pathname.startsWith('/en') ? 'en' : 'pt';

  const getLinkClass = (langKey: 'pt' | 'en') =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      currentLang === langKey
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header
      lang={currentLang === 'en' ? 'en-US' : 'pt-BR'}
      aria-label={currentLang === 'en' ? 'Site header' : 'Cabeçalho do site'}
      className="w-full bg-gray-100 dark:bg-gray-900 shadow-sm transition-colors duration-500"
    >
      <nav
        className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center 
                   px-4 py-3 sm:py-4 gap-2 sm:gap-0 lg:px-8"
      >
        {/* Links de idioma */}
        <div className="flex space-x-2 sm:space-x-4">
          <Link
            href="/pt"
            className={getLinkClass('pt')}
            aria-current={currentLang === 'pt' ? 'page' : undefined}
          >
            {dict.header?.portuguese ?? 'Português'}
          </Link>
          <Link
            href="/en"
            className={getLinkClass('en')}
            aria-current={currentLang === 'en' ? 'page' : undefined}
          >
            {dict.header?.english ?? 'English'}
          </Link>
        </div>

        {/* Texto adaptável */}
        <span
          className="text-[clamp(0.75rem,1vw,0.875rem)] uppercase tracking-widest font-medium 
                     text-gray-500 dark:text-gray-400 mt-2 sm:mt-0"
        >
          {currentLang === 'en'
            ? dict.header?.international ?? 'International'
            : dict.header?.brazil ?? 'Brasil'}
        </span>
      </nav>
    </header>
  );
}

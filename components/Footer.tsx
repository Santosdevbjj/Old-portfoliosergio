"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const dict = getDictionary(lang);

  return (
    <footer
      className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20"
      aria-label="Rodapé"
    >
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Texto / Direitos autorais */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} Sérgio Santos
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            {dict.footer.rights}
          </p>
        </div>

        {/* Links sociais com seus links reais */}
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/Santosdevbjj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.8-1 .1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/santossergioluiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.9c0-1.9-.1-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-4V8z" />
            </svg>
          </a>
        </div>

        {/* Language Switcher corrigido */}
        <div className="flex items-center">
          <LanguageSwitcher lang={lang} dict={dict.navigation} />
        </div>
      </div>
    </footer>
  );
}

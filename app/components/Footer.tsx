"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Translations, Locale } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
  navigation: Translations["navigation"];
  footer: Translations["footer"];
}

export default function Footer({ lang, navigation, footer }: FooterProps) {
  return (
    <footer
      className="
        w-full
        border-t border-gray-200 dark:border-gray-700
        bg-gray-50 dark:bg-gray-900
      "
      aria-label="Site footer"
      lang={lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR"}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Linha superior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Marca */}
          <Link
            href={`/${lang}`}
            className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Sérgio Santos
          </Link>

          {/* Navegação secundária */}
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
            aria-label="Footer navigation"
          >
            <Link href={`/${lang}`} className="nav-link">
              {navigation.home}
            </Link>
            <Link href={`/${lang}/about`} className="nav-link">
              {navigation.about}
            </Link>
            <Link href={`/${lang}/projects`} className="nav-link">
              {navigation.projects}
            </Link>
            <Link href={`/${lang}/contact`} className="nav-link">
              {navigation.contact}
            </Link>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} />

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Santosdevbjj"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.38-3.87-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56a11.52 11.52 0 0 0 7.85-10.97C23.5 5.74 18.27.5 12 .5z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/seuusuario"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zm7 0h3.8v1.64h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.74 0-2 1.36-2 2.75V21h-4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Sérgio Santos. {footer.rights}
        </div>
      </div>
    </footer>
  );
}

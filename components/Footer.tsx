"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  return (
    <footer className="border-t border-light dark:border-dark bg-surface-light dark:bg-surface-dark mt-10">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Texto / Direitos autorais */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Sergio Santos. Todos os direitos reservados.
        </p>

        {/* Links sociais */}
        <div className="flex gap-4">
          <Link
            href="https://github.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.8-1 .1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </Link>

          <Link
            href="https://linkedin.com/in/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.9c0-1.9-.1-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-4V8z" />
            </svg>
          </Link>

          <Link
            href="https://twitter.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.4 4.8c-.8.4-1.7.7-2.6.8.9-.5 1.6-1.4 1.9-2.4-.9.5-1.9.9-3 1.1a4.6 4.6 0 0 0-7.9 4.2c-3.8-.2-7.2-2-9.5-4.8a4.6 4.6 0 0 0-.6 2.3c0 1.6.8 3 2.1 3.9-.7 0-1.4-.2-2-.5v.1c0 2.3 1.6 4.2 3.7 4.6-.4.1-.9.2-1.4.2-.3 0-.7 0-1-.1.7 2.2 2.7 3.8 5.1 3.9a9.3 9.3 0 0 1-5.7 2c-.4 0-.8 0-1.2-.1a13.1 13.1 0 0 0 7.1 2.1c8.5 0 13.2-7 13.2-13.2v-.6c.9-.6 1.6-1.4 2.2-2.3z" />
            </svg>
          </Link>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import type { Lang } from "@/lib/i18n/config";

interface HeaderProps {
  dict: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
  };
  lang: Lang;
}

export default function Header({ dict, lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Site header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Nome */}
        <div className="flex items-center space-x-2">
          <Link href={`/${lang}`} className="flex items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Sergio Santos
            </span>
          </Link>
        </div>

        {/* Navegação principal (desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            {dict.home}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            {dict.about}
          </Link>
          <Link
            href={`/${lang}/projects`}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            {dict.projects}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            {dict.contact}
          </Link>
        </nav>

        {/* Ações à direita */}
        <div className="flex items-center space-x-4">
          {/* Seletor de idioma */}
          <LanguageSwitcher lang={lang} dict={dict} />

          {/* Botão Dark Mode */}
          <DarkModeToggle lang={lang} />

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-900 dark:text-gray-100 focus:outline-none"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <div className="md:hidden flex justify-center border-t border-gray-200 dark:border-gray-700 py-2">
          <nav className="flex flex-col space-y-2 text-center">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.home}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.about}
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.projects}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
            >
              {dict.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

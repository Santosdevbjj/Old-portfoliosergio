"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header
      className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Site header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Nome */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Sergio Santos
            </span>
          </Link>
        </div>

        {/* Navegação principal */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
        </nav>

        {/* Ações à direita (Language Switcher + Dark Mode futuro) */}
        <div className="flex items-center space-x-4">
          {/* Seletor de idioma elegante */}
          <LanguageSwitcher />

          {/* Exemplo: botão de dark mode (opcional futuro) */}
          {/* <button className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            🌙
          </button> */}
        </div>
      </div>

      {/* Navegação mobile */}
      <div className="md:hidden flex justify-center border-t border-gray-200 dark:border-gray-700 py-2">
        <nav className="flex space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

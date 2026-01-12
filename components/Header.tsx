"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, DEFAULT_LOCALE } from "@/lib/i18n";

type HeaderProps = {
  locale?: string;
};

export default function Header({ locale = DEFAULT_LOCALE }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dict = getDictionary(locale);

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          aria-label={dict.navigation.home}
        >
          Sergio Santos
        </Link>

        {/* Menu desktop */}
        <nav
          className="hidden md:flex gap-6 items-center"
          role="navigation"
          aria-label={dict.navigation.menu}
        >
          <Link
            href={`/${locale}/projects`}
            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
          >
            {dict.navigation.projects}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
          >
            {dict.navigation.about}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
          >
            {dict.navigation.contact}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Botão hamburguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label={isOpen ? dict.navigation.closeMenu : dict.navigation.openMenu}
          aria-expanded={isOpen}
        >
          <svg
            className="h-6 w-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark">
          <nav
            className="flex flex-col gap-4 p-4"
            role="navigation"
            aria-label={dict.navigation.menu}
          >
            <Link
              href={`/${locale}/projects`}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
            >
              {dict.navigation.projects}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
            >
              {dict.navigation.about}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition"
            >
              {dict.navigation.contact}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}

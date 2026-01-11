"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, DEFAULT_LOCALE } from "@/lib/i18n";

export default function Header({ locale = DEFAULT_LOCALE }) {
  const [isOpen, setIsOpen] = useState(false);
  const dict = getDictionary(locale);

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-xl font-bold animate-textGradient"
          aria-label={dict.navigation.home}
        >
          Sergio Santos
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 items-center" role="navigation" aria-label="Menu principal">
          <Link href={`/${locale}/projects`} className="nav-link">
            {dict.navigation.projects}
          </Link>
          <Link href={`/${locale}/about`} className="nav-link">
            {dict.navigation.about}
          </Link>
          <Link href={`/${locale}/contact`} className="nav-link">
            {dict.navigation.contact}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Botão hamburguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <svg
            className="h-6 w-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark">
          <nav className="flex flex-col gap-4 p-4" role="navigation" aria-label="Menu principal">
            <Link href={`/${locale}/projects`} className="nav-link">
              {dict.navigation.projects}
            </Link>
            <Link href={`/${locale}/about`} className="nav-link">
              {dict.navigation.about}
            </Link>
            <Link href={`/${locale}/contact`} className="nav-link">
              {dict.navigation.contact}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}

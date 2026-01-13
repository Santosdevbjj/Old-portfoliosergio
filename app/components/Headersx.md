"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import type { Translations, Locale } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
  navigation: Translations["navigation"];
  theme: Translations["theme"];
}

export default function Header({ lang, navigation, theme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        border-b border-gray-200 dark:border-gray-700
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur
      "
      aria-label="Site header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100"
          onClick={closeMenu}
        >
          Sérgio Santos
        </Link>

        {/* Navegação desktop */}
        <nav
          className="hidden md:flex items-center space-x-6"
          aria-label="Main navigation"
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
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <ThemeToggle dictionary={theme} />

          {/* Botão menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="
              md:hidden
              rounded-md p-2
              text-gray-900 dark:text-gray-100
              hover:bg-gray-100 dark:hover:bg-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <span aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="
            md:hidden
            border-t border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900
            px-4 py-4
            space-y-3
            text-center
          "
          aria-label="Mobile navigation"
        >
          <Link href={`/${lang}`} className="nav-link" onClick={closeMenu}>
            {navigation.home}
          </Link>
          <Link href={`/${lang}/about`} className="nav-link" onClick={closeMenu}>
            {navigation.about}
          </Link>
          <Link href={`/${lang}/projects`} className="nav-link" onClick={closeMenu}>
            {navigation.projects}
          </Link>
          <Link href={`/${lang}/contact`} className="nav-link" onClick={closeMenu}>
            {navigation.contact}
          </Link>
        </nav>
      )}
    </header>
  );
}

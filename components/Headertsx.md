"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Usando a função síncrona e o tipo correto
  const dict = getDictionary(lang);

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Sérgio Santos
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href={`/${lang}`} className="text-sm font-medium hover:text-blue-600 transition">
            {dict.navigation.home}
          </Link>
          <Link href="#projects-title" className="text-sm font-medium hover:text-blue-600 transition">
            {dict.navigation.projects}
          </Link>
          <a 
            href={dict.cv.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium hover:text-blue-600 transition"
          >
            Curriculum
          </a>
          
          {/* Passando as props obrigatórias para o Switcher */}
          <LanguageSwitcher lang={lang} dict={dict.navigation} />
        </nav>

        {/* Botão hamburguer (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          aria-expanded={isOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4">
          <nav className="flex flex-col gap-4">
            <Link href={`/${lang}`} className="text-base font-medium" onClick={() => setIsOpen(false)}>
              {dict.navigation.home}
            </Link>
            <Link href="#projects-title" className="text-base font-medium" onClick={() => setIsOpen(false)}>
              {dict.navigation.projects}
            </Link>
            <LanguageSwitcher lang={lang} dict={dict.navigation} />
          </nav>
        </div>
      )}
    </header>
  );
}

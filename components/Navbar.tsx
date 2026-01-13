"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle"; // Importando o componente revisado
import { Locale, Translations } from "@/lib/i18n";

interface Props {
  lang: Locale;
  dict: Translations; // Recebendo o dicionário como Prop para performance
}

export default function Navbar({ lang, dict }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const projectsHref = isHomePage ? "#projects-title" : `/${lang}#projects-title`;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link href={`/${lang}`} className="flex flex-col leading-none group">
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              SÉRGIO SANTOS
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] dark:text-slate-400">
              Data & Software
            </span>
          </Link>

          {/* DESKTOP NAVEGAÇÃO */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${lang}`} 
              className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                isHomePage ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {dict.navigation.home}
            </Link>
            
            <Link 
              href={projectsHref} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              {dict.navigation.projects}
            </Link>

            <Link 
              href={`/${lang}/about`} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              {dict.navigation.about || "About"}
            </Link>
          </div>

          {/* ACTIONS: TEMA + IDIOMA + MOBILE MENU */}
          <div className="flex items-center gap-3 sm:gap-6">
            <DarkModeToggle dict={dict.theme} />
            
            <div className="hidden sm:block">
              <LanguageSwitcher lang={lang} dict={dict.navigation} />
            </div>

            {/* BOTÃO MOBILE */}
            <button 
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link href={`/${lang}`} className="block text-base font-medium text-slate-700 dark:text-slate-200">{dict.navigation.home}</Link>
            <Link href={projectsHref} className="block text-base font-medium text-slate-700 dark:text-slate-200">{dict.navigation.projects}</Link>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <LanguageSwitcher lang={lang} dict={dict.navigation} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

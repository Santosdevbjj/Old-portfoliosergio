"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import { Locale, Translations } from "@/lib/i18n";

interface Props {
  lang: Locale;
  dict: Translations;
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

  // Fecha o menu mobile ao mudar de página
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  
  // Lógica de ancoragem inteligente para a seção de projetos
  const projectsHref = isHomePage ? "#projects-title" : `/${lang}#projects-title`;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-md border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO - Com efeito hover suave */}
          <Link href={`/${lang}`} className="flex flex-col leading-none group transition-transform active:scale-95">
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent transition-all group-hover:from-indigo-500 group-hover:to-blue-600">
              SÉRGIO SANTOS
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] dark:text-slate-400 group-hover:text-blue-500 transition-colors">
              Data & Software
            </span>
          </Link>

          {/* DESKTOP NAVEGAÇÃO */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${lang}`} 
              className={`text-sm font-bold transition-all hover:text-blue-600 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full ${
                isHomePage ? "text-blue-600 after:w-full" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {dict.navigation.home}
            </Link>
            
            <Link 
              href={projectsHref} 
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all py-1"
            >
              {dict.navigation.projects}
            </Link>

            <Link 
              href={`/${lang}/about`} 
              className={`text-sm font-bold transition-all hover:text-blue-600 py-1 ${
                pathname.includes('/about') ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {dict.navigation.about}
            </Link>
          </div>

          {/* ACTIONS: TEMA + IDIOMA + MOBILE MENU */}
          <div className="flex items-center gap-3 sm:gap-6">
            <DarkModeToggle dict={dict.theme} />
            
            <div className="hidden sm:block border-l border-slate-200 dark:border-slate-800 pl-6">
              <LanguageSwitcher lang={lang} dict={dict.navigation} />
            </div>

            {/* BOTÃO MOBILE */}
            <button 
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
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

      {/* MOBILE MENU DROPDOWN - Com animação de entrada */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="px-6 pt-4 pb-8 space-y-4">
            <Link href={`/${lang}`} className="block text-lg font-bold text-slate-700 dark:text-slate-200 active:text-blue-600">
              {dict.navigation.home}
            </Link>
            <Link href={projectsHref} className="block text-lg font-bold text-slate-700 dark:text-slate-200 active:text-blue-600">
              {dict.navigation.projects}
            </Link>
            <Link href={`/${lang}/about`} className="block text-lg font-bold text-slate-700 dark:text-slate-200 active:text-blue-600">
              {dict.navigation.about}
            </Link>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-bold">Idioma / Language</p>
              <LanguageSwitcher lang={lang} dict={dict.navigation} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

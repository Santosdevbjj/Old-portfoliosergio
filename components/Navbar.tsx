"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";
import { Locale, Dictionary } from "@/lib/i18n";
import { Menu, X, ChevronRight } from "lucide-react";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Otimização de scroll com threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sincroniza fechamento do menu
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;
  const projectsHref = isHomePage ? "#featured-project" : `/${lang}#featured-project`;

  const navLinks = [
    { name: dict.navigation.home, href: `/${lang}`, active: isHomePage },
    { name: dict.navigation.projects, href: projectsHref, active: false },
    { name: dict.navigation.about, href: `/${lang}/about`, active: pathname.includes('/about') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-black/5 border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-6 bg-transparent"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO - Minimalista e Premium */}
          <Link href={`/${lang}`} className="relative z-10 flex flex-col group active:scale-95 transition-transform">
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              SÉRGIO <span className="text-blue-600 transition-colors group-hover:text-blue-500">SANTOS</span>
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-200">
              Data Engineering
            </span>
          </Link>

          {/* DESKTOP NAV - Tipografia de alta precisão */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-blue-600 ${
                  link.active ? "text-blue-600" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTIONS: TEMA + IDIOMA + MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 border-r border-slate-200 dark:border-slate-800 pr-4 mr-2">
               <DarkModeToggle dict={dict.theme} />
               <LanguageSwitcher lang={lang} />
            </div>

            {/* BOTÃO MOBILE - Lucide Icons */}
            <button 
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 active:scale-90 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Estilo Fullscreen Overlay sutil */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full h-screen bg-white dark:bg-slate-950 p-6 animate-in slide-in-from-top-2 duration-300 ease-out"
        >
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="flex items-center justify-between text-2xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-4"
              >
                {link.name}
                <ChevronRight className="text-blue-600" />
              </Link>
            ))}
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Tema</p>
                <DarkModeToggle dict={dict.theme} />
              </div>
              <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Idioma</p>
                <LanguageSwitcher lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

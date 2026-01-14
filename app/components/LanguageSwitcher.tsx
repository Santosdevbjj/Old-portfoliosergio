"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { ChevronDown, Check } from "lucide-react";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

interface LanguageSwitcherProps {
  lang: Locale;
  dict: { language: string };
}

function LanguageSwitcherContent({ lang, dict }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLang: Locale) => {
    if (newLang === lang) {
      setOpen(false);
      return;
    }

    setOpen(false);
    if (!pathname) return;

    // 🍪 Persistência com atributos de segurança para o Middleware
    document.cookie = `locale=${newLang};path=/;max-age=31536000;SameSite=Lax;priority=high`;

    const segments = pathname.split("/").filter(Boolean);

    // Substitui ou adiciona o idioma no path de forma resiliente
    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    const queryString = searchParams.toString();
    const newPath = `/${segments.join("/")}${queryString ? `?${queryString}` : ""}`;

    // Transição suave
    router.push(newPath);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-2 px-4 py-2 
          rounded-2xl border transition-all duration-300 shadow-sm
          text-sm font-black uppercase tracking-widest
          ${open 
            ? "border-blue-500 ring-4 ring-blue-500/10 bg-white dark:bg-slate-900 text-blue-600" 
            : "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
          }
          backdrop-blur-md
        `}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={dict.language}
      >
        <span className="text-base grayscale-[0.2] group-hover:grayscale-0 transition-all">
          {currentLanguage.flag}
        </span>
        <span className="hidden md:inline">{currentLanguage.code}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`} 
        />
      </button>

      {open && (
        <div className="
          absolute right-0 z-[120] mt-3 w-56
          rounded-[2rem] border border-slate-200 dark:border-slate-800
          bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl
          shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300
          p-2
        ">
          <div className="px-3 py-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {dict.language}
            </span>
          </div>
          <ul role="menu" className="space-y-1">
            {languages.map((option) => (
              <li key={option.code} role="none">
                <button
                  role="menuitem"
                  onClick={() => handleChange(option.code)}
                  className={`
                    flex w-full items-center gap-3 px-4 py-3 text-xs rounded-2xl font-black uppercase tracking-widest
                    transition-all duration-200 group
                    ${lang === option.code 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                >
                  <span className="text-lg">{option.flag}</span>
                  <span className="flex-1 text-left">{option.label}</span>
                  {lang === option.code && <Check size={14} className="text-white" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<div className="h-10 w-12 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />}>
      <LanguageSwitcherContent {...props} />
    </Suspense>
  );
}

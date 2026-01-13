"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

interface LanguageSwitcherProps {
  lang: Locale;
  dict: { language: string };
}

export default function LanguageSwitcher({ lang, dict }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLang: Locale) => {
    setOpen(false);
    if (!pathname) return;

    // Salva a preferência no cookie para o Middleware respeitar no próximo acesso
    document.cookie = `locale=${newLang};path=/;max-age=31536000;SameSite=Lax`;

    const segments = pathname.split("/").filter(Boolean);

    // Se o primeiro segmento for um idioma conhecido, substitui
    if (languages.some((l) => l.code === segments[0])) {
      segments[0] = newLang;
    } else {
      // Caso a URL não tenha idioma (ex: /about), adiciona o novo
      segments.unshift(newLang);
    }

    router.push("/" + segments.join("/"));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2 px-3 py-2 
          rounded-lg border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-900 
          text-sm font-medium text-slate-700 dark:text-slate-200
          hover:bg-slate-50 dark:hover:bg-slate-800
          transition-all duration-200 shadow-sm
        "
        aria-expanded={open}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.label}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="
          absolute right-0 z-[100] mt-2 w-40
          rounded-xl border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-900 shadow-xl
          animate-in fade-in zoom-in duration-150
        ">
          <ul className="p-1">
            {languages.map((option) => (
              <li key={option.code}>
                <button
                  onClick={() => handleChange(option.code)}
                  className={`
                    flex w-full items-center gap-3 px-3 py-2 text-sm rounded-lg
                    ${lang === option.code 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <span>{option.flag}</span>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

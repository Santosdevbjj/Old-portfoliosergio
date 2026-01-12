"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  const languages = [
    { code: "pt", label: "PT", flag: "🇧🇷" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
  ];

  // Função para calcular a nova rota mantendo a página atual
  const getTransformedPathname = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    segments[1] = newLocale; // Substitui o código do idioma (ex: /pt/ -> /en/)
    return segments.join("/");
  };

  return (
    <nav className="flex items-center gap-2" aria-label="Seletor de idioma">
      {languages.map(({ code, label, flag }) => {
        const isActive = pathname?.startsWith(`/${code}`);
        
        return (
          <Link
            key={code}
            href={getTransformedPathname(code)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold transition-all
              ${isActive 
                ? "bg-primary text-white shadow-sm" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            <span>{flag}</span>
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

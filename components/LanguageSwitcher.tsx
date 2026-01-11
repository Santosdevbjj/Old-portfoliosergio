"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SUPPORTED_LOCALES, getDictionary, DEFAULT_LOCALE } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  if (!pathname) return null;

  // Exemplo: /pt/projects/arquivo → ["", "pt", "projects", "arquivo"]
  const segments = pathname.split("/");
  const currentLang = SUPPORTED_LOCALES.includes(segments[1] as any)
    ? (segments[1] as typeof SUPPORTED_LOCALES[number])
    : DEFAULT_LOCALE;
  const restPath = segments.slice(2).join("/");

  const dict = getDictionary(currentLang);

  return (
    <nav aria-label={dict.navigation.language} className="flex gap-2">
      {SUPPORTED_LOCALES.map((lang) => {
        const href = restPath ? `/${lang}/${restPath}` : `/${lang}`;
        const label =
          lang === "pt"
            ? "Português"
            : lang === "en"
            ? "English"
            : "Español";

        return (
          <Link
            key={lang}
            href={href}
            aria-label={`Mudar idioma para ${label}`}
            aria-current={currentLang === lang ? "true" : undefined}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
              ${
                currentLang === lang
                  ? "bg-primary text-white"
                  : "bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
              }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

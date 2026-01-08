"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Lang } from "@/lib/i18n/config";

const languages: { code: Lang; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
];

interface LanguageSwitcherProps {
  lang: Lang;
  dict: { language: string };
}

export default function LanguageSwitcher({ lang, dict }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === lang)?.code || "en";

  const handleChange = (newLang: Lang) => {
    setOpen(false);

    // Ajusta rota substituindo o idioma atual
    const segments = pathname?.split("/") || [];
    if (languages.some((l) => l.code === segments[1])) {
      segments[1] = newLang;
    } else {
      segments.unshift(newLang);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botão principal */}
      <button
        type="button"
        className="
          inline-flex w-full justify-center items-center
          rounded-md border border-gray-300 bg-white px-3 py-2
          text-sm font-medium text-gray-700 shadow-sm
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500
          dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
        "
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={dict.language}
      >
        🌐 {languages.find((l) => l.code === currentLang)?.label || "English"}
        <svg
          className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown responsivo */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40 origin-top-right
            rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
            focus:outline-none dark:bg-gray-800
          "
          role="menu"
        >
          <div className="py-1">
            {languages.map((langOption) => (
              <button
                key={langOption.code}
                onClick={() => handleChange(langOption.code)}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  currentLang === langOption.code
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
                role="menuitem"
              >
                {langOption.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

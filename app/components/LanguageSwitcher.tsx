"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
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

    const segments = pathname.split("/").filter(Boolean);

    // Substitui idioma atual
    if (languages.some((l) => l.code === segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    router.push("/" + segments.join("/"));
  };

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      aria-label={dict.language}
    >
      {/* Botão principal */}
      <button
        type="button"
        className="
          inline-flex items-center gap-2
          rounded-md border border-gray-300
          bg-white px-3 py-2 text-sm font-medium
          text-gray-700 shadow-sm
          hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-primary
          dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
        "
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        🌐 {languages.find((l) => l.code === lang)?.label}
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-300"
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

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="
            absolute right-0 z-50 mt-2 min-w-[8rem]
            rounded-md bg-white shadow-lg
            ring-1 ring-black ring-opacity-5
            dark:bg-gray-800
          "
        >
          <ul className="py-1">
            {languages.map((option) => (
              <li key={option.code}>
                <button
                  onClick={() => handleChange(option.code)}
                  role="menuitem"
                  aria-selected={lang === option.code}
                  className={`
                    block w-full px-4 py-2 text-left text-sm
                    ${
                      lang === option.code
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                >
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

"use client";

import { useEffect, useState } from "react";
import type { Translations } from "@/lib/i18n";

type Theme = "light" | "dark";

interface ThemeToggleProps {
  dictionary: Translations["theme"];
}

export default function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");

  // Inicializa o tema no client
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Aplica o tema no DOM e persiste
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";
  const label = isDark
    ? dictionary.themeLight
    : dictionary.themeDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      aria-live="polite"
      className="
        flex items-center gap-2
        p-2 sm:px-4 sm:py-2
        rounded-md
        bg-gray-100 dark:bg-gray-800
        text-gray-800 dark:text-gray-200
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-colors duration-300
        text-sm sm:text-base
        focus:outline-none
        focus:ring-2 focus:ring-offset-2
        focus:ring-blue-500
      "
    >
      <span className="whitespace-nowrap">
        {label}
      </span>

      <span role="img" aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

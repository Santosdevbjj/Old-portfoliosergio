"use client";

import { useEffect, useState } from "react";
import type { Translations } from "@/lib/i18n";

type ThemeToggleProps = {
  dictionary: Translations["theme"];
};

export default function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detecta e aplica tema inicial + observa mudanças no sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      const initialTheme = prefersDark.matches ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", prefersDark.matches);

      // Listener para mudanças no sistema
      const handleChange = (event: MediaQueryListEvent) => {
        const newTheme = event.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
      };

      prefersDark.addEventListener("change", handleChange);
      return () => prefersDark.removeEventListener("change", handleChange);
    }
  }, []);

  // Alterna tema manualmente
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm sm:text-base"
      aria-label={theme === "light" ? dictionary.themeDark : dictionary.themeLight}
      aria-pressed={theme === "dark"}
    >
      <span>{theme === "light" ? dictionary.themeLight : dictionary.themeDark}</span>
      {theme === "light" ? (
        <span role="img" aria-label="Light mode">🌞</span>
      ) : (
        <span role="img" aria-label="Dark mode">🌙</span>
      )}
    </button>
  );
}

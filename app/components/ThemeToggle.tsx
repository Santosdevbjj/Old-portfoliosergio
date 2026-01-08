"use client";

import { useEffect, useState } from "react";

type ThemeToggleProps = {
  dictionary: {
    themeLight: string;
    themeDark: string;
  };
};

export default function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detecta preferência do sistema e aplica ao carregar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", prefersDark);
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
      aria-label="Toggle theme"
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

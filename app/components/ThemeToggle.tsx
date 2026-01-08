"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Executa SOMENTE no cliente, após hidratação
  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }

  // Evita hydration mismatch
  if (!mounted) {
    return (
      <div
        className="w-10 h-10 opacity-0"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        w-10 h-10 flex items-center justify-center rounded-full
        bg-gray-100 dark:bg-gray-800 shadow-sm
        hover:scale-110 transition-transform
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Modo claro" : "Modo escuro"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

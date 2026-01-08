"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Inicialização segura no cliente
  useEffect(() => {
    setMounted(true);

    const html = document.documentElement;
    const dark =
      html.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark";

    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    setIsDark(dark);

    // Sincroniza tema entre abas
    function handleStorageChange(e: StorageEvent) {
      if (e.key === "theme") {
        const isDarkMode = e.newValue === "dark";
        html.classList.toggle("dark", isDarkMode);
        setIsDark(isDarkMode);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const nextIsDark = !html.classList.contains("dark");

    html.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  // Evita flash / hydration mismatch
  if (!mounted) {
    return (
      <div
        className="p-2 text-xl opacity-0 w-10 h-10"
        aria-hidden="true"
      >
        🌙
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 w-10 h-10 flex items-center justify-center rounded-full
                 bg-gray-100 dark:bg-gray-800 shadow-sm
                 hover:scale-110 transition-transform
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 cursor-pointer"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

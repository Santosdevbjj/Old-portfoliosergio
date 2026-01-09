"use client";
import { useEffect, useState } from "react";
import { translations } from "@/lib/i18n";

interface Props {
  lang: "pt" | "en" | "es";
}

export default function DarkModeToggle({ lang }: Props) {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") return true;
      if (storedTheme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [manualOverride, setManualOverride] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== null;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!manualOverride) {
        const newDark = event.matches;
        setDark(newDark);
        document.documentElement.classList.toggle("dark", newDark);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dark, manualOverride]);

  const toggle = () => {
    setDark((prev) => {
      const newValue = !prev;
      document.documentElement.classList.toggle("dark", newValue);
      localStorage.setItem("theme", newValue ? "dark" : "light");
      setManualOverride(true);
      return newValue;
    });
  };

  const reset = () => {
    localStorage.removeItem("theme");
    setManualOverride(false);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(systemPrefersDark);
    document.documentElement.classList.toggle("dark", systemPrefersDark);
  };

  return (
    <div className="flex space-x-2">
      {/* Botão principal */}
      <button
        onClick={toggle}
        className="
          flex items-center justify-center
          px-2 sm:px-4 py-2 rounded-md
          bg-gray-200 dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          transition-colors duration-300
          text-sm sm:text-base font-medium
          hover:bg-gray-300 dark:hover:bg-gray-600
        "
        aria-label={
          dark
            ? translations[lang].darkMode.lightMode
            : translations[lang].darkMode.darkMode
        }
        title={
          dark
            ? translations[lang].darkMode.lightMode
            : translations[lang].darkMode.darkMode
        }
        aria-pressed={dark}
      >
        <span className="text-base sm:text-lg md:text-xl mr-2">
          {dark ? "☀️" : "🌙"}
        </span>
        <span className="hidden sm:inline">
          {dark
            ? translations[lang].darkMode.lightMode
            : translations[lang].darkMode.darkMode}
        </span>
      </button>

      {/* Botão de reset com ícones diferentes */}
      {manualOverride && (
        <div className="flex space-x-1">
          <button
            onClick={reset}
            className="
              px-2 sm:px-3 py-2 rounded-md
              bg-gray-100 dark:bg-gray-600
              text-gray-700 dark:text-gray-200
              text-sm font-medium
              hover:bg-gray-200 dark:hover:bg-gray-500
            "
            aria-label="Reset theme to system preference"
            title="Reset theme to system preference"
          >
            🔄 {/* ícone de recarregar */}
          </button>
          <button
            onClick={reset}
            className="
              px-2 sm:px-3 py-2 rounded-md
              bg-gray-100 dark:bg-gray-600
              text-gray-700 dark:text-gray-200
              text-sm font-medium
              hover:bg-gray-200 dark:hover:bg-gray-500
            "
            aria-label="Reset theme to system preference"
            title="Reset theme to system preference"
          >
            ↩️ {/* ícone de voltar */}
          </button>
          <button
            onClick={reset}
            className="
              px-2 sm:px-3 py-2 rounded-md
              bg-gray-100 dark:bg-gray-600
              text-gray-700 dark:text-gray-200
              text-sm font-medium
              hover:bg-gray-200 dark:hover:bg-gray-500
            "
            aria-label="Reset theme to system preference"
            title="Reset theme to system preference"
          >
            🗑️ {/* ícone de limpar */}
          </button>
        </div>
      )}
    </div>
  );
}

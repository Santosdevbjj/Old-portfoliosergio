"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const dark = localStorage.getItem("theme") === "dark" || html.classList.contains("dark");
    setIsDark(dark);
    html.classList.toggle("dark", dark);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const next = !isDark;
    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  if (!mounted) return <div className="w-10 h-10 opacity-0" aria-hidden="true" />;

  return (
    <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 text-white shadow-md hover:scale-110 transition-transform" aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

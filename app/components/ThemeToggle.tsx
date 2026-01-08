"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Garante que o componente só renderize o ícone após o cliente carregar
  // Isso evita erros de hidratação (quando o servidor pensa uma coisa e o cliente outra)
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const currentIsDark = html.classList.contains("dark");

    if (currentIsDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  // Evita que o botão apareça antes do JS carregar (prevenindo o erro de onLoad/hydration)
  if (!mounted) {
    return <div className="p-2 text-xl opacity-0">☀️</div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-xl hover:scale-110 transition-transform bg-gray-100 dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

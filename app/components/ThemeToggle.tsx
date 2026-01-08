'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme ?? (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }

  if (!mounted) return <div className="w-10 h-10 opacity-0" aria-hidden="true" />;

  return (
    <button
      onClick={toggleTheme}
      className="w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] flex items-center justify-center rounded-full 
                 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-blue-800 dark:to-indigo-700 
                 shadow-lg hover:scale-110 transition-transform transition-colors duration-300 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <span className="text-[clamp(1rem,2vw,1.5rem)]">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}

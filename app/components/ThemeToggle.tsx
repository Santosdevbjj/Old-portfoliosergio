'use client';

import { useState, useEffect } from 'react';
import { Dictionary } from '@/lib/i18n';

interface Props {
  dict: Dictionary;   // dicionário multilíngue carregado dinamicamente
  lang: 'pt' | 'en';  // idioma atual
}

export default function ThemeToggle({ dict, lang }: Props) {
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

  if (!mounted) {
    return (
      <div
        className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] opacity-0"
        aria-hidden="true"
      />
    );
  }

  // Traduções vindas do dicionário
  const labelLight =
    lang === 'en'
      ? dict.portfolio?.toggleLight ?? 'Activate light mode'
      : dict.portfolio?.toggleLight ?? 'Ativar modo claro';

  const labelDark =
    lang === 'en'
      ? dict.portfolio?.toggleDark ?? 'Activate dark mode'
      : dict.portfolio?.toggleDark ?? 'Ativar modo escuro';

  const ariaTitle = theme === 'dark' ? labelLight : labelDark;

  return (
    <button
      onClick={toggleTheme}
      title={ariaTitle}
      aria-label={ariaTitle}
      className="w-[clamp(2.5rem,3vw,3rem)] h-[clamp(2.5rem,3vw,3rem)] p-[clamp(0.5rem,1vw,0.75rem)] 
                 flex items-center justify-center rounded-full 
                 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-blue-800 dark:to-indigo-700 
                 shadow-lg hover:scale-110 transition-transform transition-colors duration-300 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      <span className="text-[clamp(1rem,2vw,1.5rem)] transition-opacity duration-300">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}

"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  resetTheme: () => void;
  applyTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializamos sem valor para evitar conflito de hidratação (SSR vs Client)
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const applyToDOM = useCallback((dark: boolean) => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    }
  }, []);

  // 1. Carregamento Inicial
  useEffect(() => {
    setMounted(true);
    const storedTheme = (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="))
        ?.split("=")[1] || localStorage.getItem("theme")
    ) as Theme | undefined;

    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  // 2. Efeito Centralizador: Reage a mudanças no estado 'theme'
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      const shouldBeDark = 
        theme === "dark" || (theme === "system" && mediaQuery.matches);
      
      setIsDark(shouldBeDark);
      applyToDOM(shouldBeDark);
    };

    updateTheme();

    // Ouvinte para mudanças no sistema (apenas se estiver em modo system)
    if (theme === "system") {
      mediaQuery.addEventListener("change", updateTheme);
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme, mounted, applyToDOM]);

  const saveThemePreference = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", newTheme);
    }
    document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = isDark ? "light" : "dark";
    saveThemePreference(nextTheme);
  }, [isDark, saveThemePreference]);

  const applyTheme = useCallback((newTheme: Theme) => {
    saveThemePreference(newTheme);
  }, [saveThemePreference]);

  const resetTheme = useCallback(() => {
    saveThemePreference("system");
  }, [saveThemePreference]);

  // Evita renderizar conteúdo instável antes da hidratação
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme, resetTheme, applyTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext deve ser usado dentro de ThemeProvider");
  }
  return context;
}

"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useTheme, Theme } from "./useTheme";

interface ThemeContextValue {
  theme: Theme;        // "light" | "dark" | "system"
  isDark: boolean;     // boolean indicando se está em dark mode
  toggleTheme: () => void;
  resetTheme: () => void;
  applyTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, isDark, toggleTheme, resetTheme, applyTheme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme, resetTheme, applyTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para consumir o contexto
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext deve ser usado dentro de ThemeProvider");
  }
  return context;
}

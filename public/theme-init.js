// public/theme-init.js
export function initTheme() {
  try {
    const theme =
      document.cookie.split("; ").find((row) => row.startsWith("theme="))?.split("=")[1] ||
      "system";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = theme === "dark" || (theme === "system" && prefersDark);

    if (useDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {
    console.error("Theme init error:", e);
  }
}

// Executa imediatamente ao importar
initTheme();

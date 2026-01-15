// public/theme-init.js
(function () {
  /**
   * Script executado no <head> para evitar FOUC (Flash of Unstyled Content).
   * Aplica o tema correto antes do primeiro paint.
   */
  function applyTheme() {
    try {
      const storedTheme = localStorage.getItem("theme"); // 'dark' | 'light' | null
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const prefersDark = mql.matches;

      const useDark =
        storedTheme === "dark" ||
        (!storedTheme && prefersDark);

      const root = document.documentElement;

      if (useDark) {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "";
      }
    } catch (e) {
      // Fallback silencioso — não bloquear renderização
      console.warn("Theme init error:", e);
    }
  }

  // Execução imediata (antes do React)
  applyTheme();

  // Escuta mudanças no tema do SO
  try {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = function () {
      // Só reage se o usuário não definiu tema manualmente
      if (!localStorage.getItem("theme")) {
        applyTheme();
      }
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else if (mql.addListener) {
      // Safari legado
      mql.addListener(handler);
    }
  } catch (e) {
    // Ignorar
  }
})();

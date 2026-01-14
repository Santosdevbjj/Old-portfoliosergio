// public/theme-init.js
(function() {
  /**
   * Este script é injetado no <head> para evitar o FOUC (Flash of Unstyled Content).
   * Ele roda antes do React/Next.js carregar, garantindo que o tema correto
   * seja aplicado no primeiro frame de pintura.
   */
  function applyTheme() {
    try {
      // 1. Verificamos a preferência armazenada
      const savedTheme = localStorage.getItem('theme');
      
      // 2. Verificamos a preferência do Sistema Operacional
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const prefersDark = mql.matches;
      
      // Lógica de decisão
      const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      if (useDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {
      // Fallback silencioso para não interromper o carregamento da página
      console.warn('Theme init error:', e);
    }
  }

  // Execução imediata
  applyTheme();

  // Escuta mudanças no sistema operacional em tempo real
  try {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.addEventListener) {
      mql.addEventListener('change', function() {
        // Só atualiza se o usuário não tiver uma preferência explícita salva
        if (!localStorage.getItem('theme')) {
          applyTheme();
        }
      });
    }
  } catch (e) {}
})();

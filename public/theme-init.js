// public/theme-init.js
(function() {
  try {
    // 1. Tenta pegar do localStorage (prioridade do usuário)
    // 2. Fallback para cookies se você estiver usando SSR para o tema
    // 3. Fallback para o sistema operacional
    const savedTheme = localStorage.getItem('theme') || 
                       document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (useDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {
    console.error('Theme initialization failed:', e);
  }
})();

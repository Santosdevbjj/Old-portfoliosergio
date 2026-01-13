// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css"; // Importação global de estilos (Tailwind)

/**
 * Root Layout Global
 * No Next.js 15, este arquivo deve renderizar as tags base <html> e <body>.
 * A lógica de [lang] continuará funcionando normalmente no layout interno.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning é necessário para o script de tema não causar erro no React
    <html suppressHydrationWarning>
      <head>
        {/* Injeção crítica para performance do Modo Escuro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
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
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-slate-950 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

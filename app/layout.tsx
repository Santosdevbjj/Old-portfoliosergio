import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Sérgio Santos | Analytics Engineer",
  description: "Portfólio de Analytics Engineering e Ciência de Dados",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Script para evitar o flash de cor branca no dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (
                  localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
                ) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors min-h-screen flex flex-col"
      >
        <Header />

        <div className="flex justify-end px-4 py-2">
          <ThemeToggle />
        </div>

        <main className="flex-grow px-4 py-6">
          {children}
        </main>

        <footer className="text-center text-sm p-8 border-t dark:border-gray-800">
          © {new Date().getFullYear()} Sérgio Santos
        </footer>
      </body>
    </html>
  );
}

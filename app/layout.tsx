import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Sérgio Santos | Analytics Engineer",
  description: "Portfólio de Analytics Engineering e Ciência de Dados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
        {/* Header responsivo */}
        <Header />

        {/* Toggle de tema adaptável */}
        <div className="flex justify-end px-4 py-2 sm:px-6 md:px-8">
          <ThemeToggle />
        </div>

        {/* Conteúdo principal com breakpoints */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-6">
          {children}
        </main>

        {/* Footer responsivo */}
        <footer className="text-center text-xs sm:text-sm p-4 sm:p-6 md:p-8 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} Sérgio Santos
        </footer>
      </body>
    </html>
  );
}

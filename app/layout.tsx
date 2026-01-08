import type { Metadata } from "next";
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
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="
          min-h-screen flex flex-col
          transition-colors duration-300
          bg-white text-gray-900
          dark:bg-gray-900 dark:text-gray-100
        "
      >
        {/* Header (Client Component) */}
        <Header />

        {/* Toggle de tema */}
        <div className="flex justify-end px-4 py-2">
          <ThemeToggle />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer (Server Component) */}
        <footer className="text-center text-sm p-8 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} Sérgio Santos
        </footer>
      </body>
    </html>
  );
}

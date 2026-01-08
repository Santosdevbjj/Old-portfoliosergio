import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

// Metadados globais
export const metadata: Metadata = {
  title: "Portfólio Sergio Santos",
  description: "Analytics Engineer | Data Science | Portfólio Multilíngue",
};

// Função auxiliar para detectar idioma da rota
function detectLang(pathname: string | null): string {
  if (!pathname) return "en";
  const segments = pathname.split("/");
  const langSegment = segments[1];
  if (langSegment === "pt") return "pt";
  if (langSegment === "en") return "en";
  return "en"; // fallback
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lang = detectLang(pathname);

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Header fixo no topo */}
        <Header />

        {/* Conteúdo principal responsivo */}
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer fixo no final */}
        <Footer />
      </body>
    </html>
  );
}

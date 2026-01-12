"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

interface Props {
  children: ReactNode;
  lang?: Locale;
}

export default function PageWrapper({
  children,
  lang = "pt",
}: Props) {
  return (
    <main
      role="main"
      lang={lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR"}
      aria-label={
        lang === "en"
          ? "Main content"
          : lang === "es"
          ? "Contenido principal"
          : "Conteúdo principal"
      }
      className="
        min-h-screen w-full flex flex-col flex-1
        px-4 sm:px-6 lg:px-8
        bg-gray-50 dark:bg-gray-900
        transition-colors duration-500
      "
    >
      {children}
    </main>
  );
}

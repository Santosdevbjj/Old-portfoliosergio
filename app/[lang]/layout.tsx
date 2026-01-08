// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

interface LayoutProps {
  children: ReactNode;
  params: { lang: "pt" | "en" };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = params;

  // Carrega dicionário multilíngue
  const dict = await getDictionary(lang);

  return (
    <PageWrapper lang={lang}>
      {/* Cabeçalho multilíngue e responsivo */}
      <Header dict={dict} lang={lang} />

      {/* Conteúdo principal flexível */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Rodapé multilíngue e responsivo */}
      <Footer dict={dict} lang={lang} />
    </PageWrapper>
  );
}

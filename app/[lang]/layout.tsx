// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { getDictionary, Locale, SUPPORTED_LOCALES } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

interface LayoutProps {
  children: ReactNode;
  params: { lang: Locale };
}

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dict = getDictionary(lang);
  const baseUrl = "https://portfoliosergiosantos.vercel.app";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${baseUrl}/${lang}`,
      siteName: "Sergio Santos Portfolio",
      images: [
        {
          url: `/og-image-${lang}.png`, // Simplificado, já que você nomeou os arquivos assim
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
      locale: lang === "pt" ? "pt_BR" : lang === "en" ? "en_US" : "es_ES",
      type: "website",
    },
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = params;
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var e=document.cookie.split("; ").find(e=>e.startsWith("theme="))?.split("=")[1]||"system",t=window.matchMedia("(prefers-color-scheme: dark)").matches,n="dark"===e||"system"===e&&t;n?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(e){}}();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <PageWrapper lang={lang}>
          {/* Ajustado para passar o locale conforme seu Header.tsx original */}
          <Header locale={lang} />

          <main role="main" className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </main>

          <Footer locale={lang} />
        </PageWrapper>
      </body>
    </html>
  );
}

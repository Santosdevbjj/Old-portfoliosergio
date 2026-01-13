// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
  params: { lang: Locale };
}

/* ========= SEO / METADATA ========= */
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const baseUrl = "https://portfoliosergiosantos.vercel.app";

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        pt: "/pt",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${baseUrl}/${lang}`,
      siteName: "Sérgio Santos Portfolio",
      locale:
        lang === "pt" ? "pt_BR" : lang === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

/* ========= LAYOUT ========= */
export default async function LangLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Dark mode early hydration fix */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark =
      storedTheme === "dark" || (!storedTheme && prefersDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (_) {}
})();
            `,
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        {/* Header */}
        <Header lang={lang} dict={dict.navigation} />

        {/* Conteúdo */}
        <main
          role="main"
          className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer
          lang={lang}
          dict={{
            ...dict.navigation,
            ...dict.footer,
          }}
        />
      </body>
    </html>
  );
}

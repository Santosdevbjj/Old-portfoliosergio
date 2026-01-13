// app/[lang]/layout.tsx
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/lib/i18n";
import { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

// No Next.js 15, o viewport é exportado separadamente para melhor performance
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>; // No Next.js 15, params é uma Promise
}

/* 🔎 Gerador de Metadados Dinâmicos para SEO */
export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const content = {
    pt: {
      title: "Sérgio Santos | Especialista em Dados e Software",
      description: "Portfólio profissional de Engenharia de Dados, IA e desenvolvimento de sistemas robustos.",
    },
    es: {
      title: "Sérgio Santos | Especialista en Datos y Software",
      description: "Portafolio profesional de Ingeniería de Datos, IA y desarrollo de sistemas robustos.",
    },
    en: {
      title: "Sérgio Santos | Data & Software Specialist",
      description: "Professional portfolio of Data Engineering, AI, and robust software development.",
    }
  };

  const current = content[lang] || content.en;
  const baseUrl = "https://seu-dominio.com"; // Substitua pelo seu domínio real

  return {
    title: {
      default: current.title,
      template: `%s | Sérgio Santos` // Permite que páginas internas como /projects mudem o título automaticamente
    },
    description: current.description,
    metadataBase: new URL(baseUrl),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US",
      url: `${baseUrl}/${lang}`,
      title: current.title,
      description: current.description,
      siteName: "Sérgio Santos Portfolio",
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: current.title,
        },
      ],
    },
  };
}

/* 🚀 Função para gerar os caminhos estáticos no build */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

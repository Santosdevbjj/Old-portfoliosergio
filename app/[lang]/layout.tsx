// app/[lang]/layout.tsx
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/lib/i18n";
import { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/hooks/ThemeContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// Removido o Promise para compatibilidade estável com Next 14
interface Props {
  children: React.ReactNode;
  params: { lang: Locale };
}

/**
 * SEO DINÂMICO INTERNACIONAL
 */
export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const lang = params.lang;
  
  const content = {
    pt: {
      title: "Sérgio Santos | Ciência de Dados e Sistemas Críticos",
      description: "Portfólio de Engenharia de Dados, IA e análise de sistemas bancários. 15+ anos de experiência.",
    },
    es: {
      title: "Sérgio Santos | Especialista en Datos y Sistemas Críticos",
      description: "Portafolio de Ingeniería de Datos, IA y análisis de sistemas bancarios. 15+ años de experiencia.",
    },
    en: {
      title: "Sérgio Santos | Data Science & Mission-Critical Systems",
      description: "Data Engineering, AI, and banking systems portfolio. 15+ years of professional experience.",
    }
  };

  const current = content[lang] || content.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";

  return {
    title: {
      default: current.title,
      template: `%s | Sérgio Santos`
    },
    description: current.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        "pt-BR": `${baseUrl}/pt`,
        "en-US": `${baseUrl}/en`,
        "es-ES": `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

/**
 * LAYOUT DE IDIOMA
 */
export default function LanguageLayout({ children, params }: Props) {
  const lang = params.lang;

  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <ThemeProvider>
        {/* Passamos o lang para a Navbar que deve ser um Client Component */}
        <Navbar lang={lang} />
        
        <main className="flex-grow animate-in fade-in duration-700">
          {children}
        </main>
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </ThemeProvider>
    </div>
  );
}

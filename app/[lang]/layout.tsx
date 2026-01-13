import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Locale, i18n, getDictionary } from "@/lib/i18n";
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
  const baseUrl = "https://portfoliosergiosantos.vercel.app";

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

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang); // Carrega o dicionário no servidor (SSR)

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased min-h-screen`}
      >
        <ThemeProvider>
          {/* Navbar integrada com dicionário carregado no servidor */}
          <Navbar lang={lang} dict={dict} />
          
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Aqui você pode inserir seu Footer posteriormente */}
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}

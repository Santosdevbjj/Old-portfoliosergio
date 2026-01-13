import { NextResponse } from "next/server";

type Locale = "en" | "pt" | "es";

const messages: Record<
  Locale,
  { greeting: (name: string) => string; description: string; footer: string }
> = {
  en: {
    greeting: (name: string) => `Hello, ${name}! Welcome to Sergio Santos' portfolio.`,
    description: "This advanced API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved."
  },
  pt: {
    greeting: (name: string) => `Olá, ${name}! Bem-vindo ao portfólio de Sergio Santos.`,
    description: "Este endpoint avançado de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados."
  },
  es: {
    greeting: (name: string) => `¡Hola, ${name}! Bienvenido al portafolio de Sergio Santos.`,
    description: "Este endpoint avanzado de API es totalmente responsivo y multilingüe.",
    footer: "Todos los derechos reservados."
  }
};

function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);
  
  // 1. Prioridade para Query Parameter (ex: /api/greeting?lang=pt)
  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam as Locale;
  }

  // 2. Fallback para o cabeçalho injetado pelo seu middleware ou Accept-Language
  const xLocale = req.headers.get("x-locale"); // Se o seu middleware injetar isso
  if (xLocale === "pt" || xLocale === "en" || xLocale === "es") return xLocale as Locale;

  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.includes("pt")) return "pt";
  if (acceptLang?.includes("es")) return "es";

  return "en";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "Guest";
  const lang = detectLang(req);

  const body = {
    status: "success",
    data: {
      lang,
      greeting: messages[lang].greeting(name),
      description: messages[lang].description,
      footer: messages[lang].footer,
      timestamp: new Date().toISOString(),
    },
    meta: {
      version: "1.1.0",
      responsive: true,
      server_region: process.env.VERCEL_REGION || "local"
    }
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      "Content-Type": "application/json",
    },
  });
}

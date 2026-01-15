// app/api/greeting/route.ts
import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";

// Força rota dinâmica (usa headers e query params)
export const dynamic = "force-dynamic";

const messages: Record<
  Locale,
  {
    greeting: (name: string) => string;
    description: string;
    footer: string;
  }
> = {
  en: {
    greeting: (name) =>
      `Hello, ${name}! Welcome to Sergio Santos' portfolio.`,
    description:
      "This advanced API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved.",
  },
  pt: {
    greeting: (name) =>
      `Olá, ${name}! Bem-vindo ao portfólio de Sergio Santos.`,
    description:
      "Este endpoint avançado de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados.",
  },
  es: {
    greeting: (name) =>
      `¡Hola, ${name}! Bienvenido al portafolio de Sergio Santos.`,
    description:
      "Este endpoint avanzado de API es totalmente responsivo y multilingüe.",
    footer: "Todos los derechos reservados.",
  },
};

/** 🌐 Detecta idioma: Query > Header > Accept-Language > Fallback */
function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);

  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam;
  }

  const xLocale = req.headers.get("x-locale")?.toLowerCase();
  if (xLocale === "pt" || xLocale === "en" || xLocale === "es") {
    return xLocale;
  }

  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.startsWith("pt")) return "pt";
  if (acceptLang?.startsWith("es")) return "es";

  return "en";
}

/** Preflight CORS */
export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-locale",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "Guest";
    const lang = detectLang(req);

    return NextResponse.json(
      {
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
          server_region: process.env.VERCEL_REGION || "local",
          environment: process.env.NODE_ENV,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("API Greeting Error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

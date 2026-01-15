// app/api/hello/route.ts
import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const messages: Record<
  Locale,
  { greeting: string; description: string; footer: string }
> = {
  en: {
    greeting: "Hello, welcome to Sergio Santos' portfolio!",
    description: "This API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved.",
  },
  pt: {
    greeting: "Olá, bem-vindo ao portfólio de Sergio Santos!",
    description: "Este endpoint de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados.",
  },
  es: {
    greeting: "¡Hola, bienvenido al portafolio de Sergio Santos!",
    description: "Este endpoint de API es totalmente responsivo y multilingüe.",
    footer: "Todos los derechos reservados.",
  },
};

/** 🌐 Detecção de idioma consistente */
function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);

  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam;
  }

  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.startsWith("pt")) return "pt";
  if (acceptLang?.startsWith("es")) return "es";

  return "en";
}

export async function GET(req: Request) {
  try {
    const lang = detectLang(req);

    return NextResponse.json(
      {
        status: "online",
        lang,
        ...messages[lang],
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.1.0",
          instance_uptime: Math.floor(process.uptime()),
          region: process.env.VERCEL_REGION || "local",
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Robots-Tag": "noindex",
          "X-Content-Type-Options": "nosniff",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("API Hello Error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

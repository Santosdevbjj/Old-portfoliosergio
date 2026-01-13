import { NextResponse } from "next/server";

// Tipagem rigorosa sincronizada com o resto do projeto
type Locale = "en" | "pt" | "es";

const messages: Record<Locale, { greeting: string; description: string; footer: string }> = {
  en: {
    greeting: "Hello, welcome to Sergio Santos' portfolio!",
    description: "This API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved."
  },
  pt: {
    greeting: "Olá, bem-vindo ao portfólio de Sergio Santos!",
    description: "Este endpoint de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados."
  },
  es: {
    greeting: "¡Hola, bienvenido al portafolio de Sergio Santos!",
    description: "Este endpoint de API é totalmente responsivo e multilingüe.",
    footer: "Todos os derechos reservados."
  }
};

/** 🌐 Detecção de Idioma Otimizada */
function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);
  
  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam as Locale;
  }

  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  // Alterado para startsWith para maior precisão em headers complexos
  if (acceptLang?.startsWith("pt")) return "pt";
  if (acceptLang?.startsWith("es")) return "es";

  return "en";
}

export async function GET(req: Request) {
  try {
    const lang = detectLang(req);

    const body = {
      status: "online",
      lang,
      ...messages[lang],
      meta: {
        timestamp: new Date().toISOString(),
        version: "1.1.0",
        // process.uptime() em serverless indica o tempo de vida do 'warm container'
        instance_uptime: Math.floor(process.uptime()), 
        region: process.env.VERCEL_REGION || "development"
      }
    };

    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        "Content-Type": "application/json",
        "X-Robots-Tag": "noindex" // Impede que esse JSON apareça nos resultados de busca do Google
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

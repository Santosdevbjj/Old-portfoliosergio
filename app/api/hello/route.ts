import { NextResponse } from "next/server";

// Tipagem rigorosa para evitar erros de compilação
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
    description: "Este endpoint de API es totalmente responsivo y multilingüe.",
    footer: "Todos los derechos reservados."
  }
};

function detectLang(req: Request): Locale {
  const { searchParams } = new URL(req.url);
  
  // 1. Tenta pegar via query param (?lang=pt)
  const langParam = searchParams.get("lang")?.toLowerCase();
  if (langParam === "pt" || langParam === "en" || langParam === "es") {
    return langParam as Locale;
  }

  // 2. Tenta pelo cabeçalho padrão de idioma do navegador
  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.includes("pt")) return "pt";
  if (acceptLang?.includes("es")) return "es";

  return "en";
}

export async function GET(req: Request) {
  const lang = detectLang(req);

  const body = {
    status: "online",
    lang,
    ...messages[lang],
    meta: {
      timestamp: new Date().toISOString(),
      version: "1.1.0",
      uptime: process.uptime(), // Útil para monitoramento
    }
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      // Diferente da greeting, aqui podemos usar cache público 
      // para carregar instantaneamente em qualquer lugar do mundo
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      "Content-Type": "application/json",
    },
  });
}

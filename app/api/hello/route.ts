import { NextResponse } from "next/server";

// Dicionários multilíngues
const messages: Record<
  string,
  { greeting: string; description: string; footer: string }
> = {
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

// Função para detectar idioma a partir da URL ou cabeçalho
function detectLang(req: Request): "en" | "pt" | "es" {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const langSegment = pathSegments[1]?.toLowerCase();

  if (["pt", "en", "es"].includes(langSegment)) {
    return langSegment as "pt" | "en" | "es";
  }

  // fallback: tenta pelo cabeçalho Accept-Language
  const acceptLang = req.headers.get("accept-language")?.toLowerCase();
  if (acceptLang?.startsWith("pt")) return "pt";
  if (acceptLang?.startsWith("es")) return "es";

  return "en";
}

// Handler GET
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = detectLang(req);

  const body = {
    lang,
    ...messages[lang],
    responsive: true,
    timestamp: new Date().toISOString(),
    version: "1.1.0",
    path: url.pathname
  };

  return NextResponse.json(body, {
    status: 200,
    headers: { "Cache-Control": "no-store" }
  });
}

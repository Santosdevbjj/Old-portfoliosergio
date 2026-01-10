import { NextResponse } from "next/server";

// Dicionários multilíngues
const messages: Record<
  string,
  { greeting: (name: string) => string; description: string; footer: string }
> = {
  en: {
    greeting: (name: string) =>
      `Hello, ${name}! Welcome to Sergio Santos' portfolio.`,
    description:
      "This advanced API endpoint is fully responsive and multilingual.",
    footer: "All rights reserved."
  },
  pt: {
    greeting: (name: string) =>
      `Olá, ${name}! Bem-vindo ao portfólio de Sergio Santos.`,
    description:
      "Este endpoint avançado de API é totalmente responsivo e multilíngue.",
    footer: "Todos os direitos reservados."
  },
  es: {
    greeting: (name: string) =>
      `¡Hola, ${name}! Bienvenido al portafolio de Sergio Santos.`,
    description:
      "Este endpoint avanzado de API es totalmente responsivo y multilingüe.",
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
  const name = url.searchParams.get("name") || "Guest"; // valor padrão
  const lang = detectLang(req);

  const body = {
    lang,
    greeting: messages[lang].greeting(name),
    description: messages[lang].description,
    footer: messages[lang].footer,
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

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

/**
 * Define o idioma do usuário com base em cookies ou cabeçalhos de navegação
 */
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages || [], locales, defaultLocale);
}

/**
 * Envia logs de acesso para o Logtail (BetterStack)
 */
async function sendLog(locale: string, pathname: string, theme: string) {
  if (!process.env.LOGTAIL_TOKEN) return;

  try {
    await fetch("https://in.logtail.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOGTAIL_TOKEN}`,
      },
      body: JSON.stringify({
        service: "middleware",
        level: "info",
        message: `Idioma: ${locale} | Tema: ${theme} | Path: ${pathname}`,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.warn("[middleware] Falha ao enviar log externo:", error);
  }
}

/**
 * Redireciona para a URL com o prefixo de idioma
 */
function redirectWithLocale(request: NextRequest, locale: string) {
  const pathname = request.nextUrl.pathname;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const theme = request.cookies.get("theme")?.value || "system";

  // Verifica se o caminho atual já possui um idioma suportado
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    void sendLog(locale, pathname, theme); // Execução em background
    return redirectWithLocale(request, locale);
  }

  const res = NextResponse.next();
  // Injeta headers úteis para os componentes
  res.headers.set("x-theme", theme);
  res.headers.set("x-locale", pathname.split("/")[1] || defaultLocale);
  return res;
}

/**
 * CONFIGURAÇÃO DO MATCHER (CORRIGIDA)
 * Esta regex impede que o middleware intercepte arquivos estáticos e de sistema.
 * O uso de (?:) evita o erro "Capturing groups are not allowed".
 */
export const config = {
  matcher: [
    /*
     * Ignora:
     * 1. api (rotas de API)
     * 2. _next (arquivos internos do framework)
     * 3. favicon.ico, sw.js (arquivos de raiz)
     * 4. Extensões de imagem e documentos (png, svg, jpg, webp, pdf)
     */
    "/((?!api|_next|favicon.ico|sw.js|.*\\.(?:png|svg|jpg|jpeg|webp|pdf)).*)",
  ],
};

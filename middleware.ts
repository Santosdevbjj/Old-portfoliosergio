// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/**
 * Configuração de idiomas
 */
const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

/**
 * Detecta o idioma com base em:
 * 1. Cookie
 * 2. Accept-Language header
 */
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();

  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  return matchLocale(languages || [], locales, defaultLocale);
}

/**
 * Envio opcional de logs (não bloqueante)
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
 * Redireciona a rota para o idioma detectado
 */
function redirectWithLocale(request: NextRequest, locale: string) {
  const pathname = request.nextUrl.pathname;

  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

/**
 * Middleware principal
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const theme = request.cookies.get("theme")?.value || "system";

  /**
   * Extensões de arquivos estáticos (SEM regex com grupos)
   * Compatível com Next.js 14
   */
  const assetExtensions = [
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".pdf",
    ".ico",
    ".gif",
  ];

  /**
   * Exclusões de rotas
   */
  const isExcluded =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/sw.js" ||
    assetExtensions.some((ext) =>
      pathname.toLowerCase().endsWith(ext)
    );

  if (isExcluded) {
    return NextResponse.next();
  }

  /**
   * Verifica se a rota já contém locale
   */
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Log não bloqueante
    sendLog(locale, pathname, theme).catch((err) =>
      console.warn("[middleware] Logtail error:", err)
    );

    return redirectWithLocale(request, locale);
  }

  /**
   * Headers customizados
   */
  const response = NextResponse.next();
  const segments = pathname.split("/");
  const currentLocale = locales.includes(segments[1])
    ? segments[1]
    : defaultLocale;

  response.headers.set("x-theme", theme);
  response.headers.set("x-locale", currentLocale);

  return response;
}

/**
 * Matcher global (válido e seguro)
 */
export const config = {
  matcher: ["/:path*"],
};

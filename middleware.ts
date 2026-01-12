// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "pt", "es"];
const defaultLocale = "pt";

// Função para detectar idioma
function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages || [], locales, defaultLocale);
}

// Função para enviar log externo
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

// Função para redirecionar com locale
function redirectWithLocale(request: NextRequest, locale: string) {
  const pathname = request.nextUrl.pathname;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const theme = request.cookies.get("theme")?.value || "system";

  // 🔎 Lógica de exclusão movida para dentro do código
  const excluded =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/sw.js" ||
    /\.(svg|png|jpg|jpeg|webp|pdf|ico|gif)$/i.test(pathname);

  if (excluded) {
    return NextResponse.next();
  }

  // Verifica se falta locale no path
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    sendLog(locale, pathname, theme).catch((err) =>
      console.warn("[middleware] Logtail error:", err)
    );
    return redirectWithLocale(request, locale);
  }

  const res = NextResponse.next();
  const currentLocale = locales.includes(pathname.split("/")[1])
    ? pathname.split("/")[1]
    : defaultLocale;

  res.headers.set("x-theme", theme);
  res.headers.set("x-locale", currentLocale);
  return res;
}

// ✅ Matcher simplificado
export const config = {
  matcher: ["/:path*"],
};

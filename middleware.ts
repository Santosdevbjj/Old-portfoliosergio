import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

const locales = ["pt", "en", "es"] as const;
const defaultLocale = "pt";

/**
 * 🕵️ Detecta o melhor idioma baseado em Cookies ou Headers do Navegador
 */
function getLocale(request: NextRequest): string {
  // 1. Prioridade Máxima: Cookie (Decisão explícita do usuário)
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 2. Fallback: Negociação de Idioma do Navegador
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const languages = new Negotiator({ headers }).languages();
    // Matcher de localidade com fallback para o padrão
    return matchLocale(languages, [...locales], defaultLocale);
  } catch (e) {
    return defaultLocale;
  }
}

/**
 * 📊 Envio de logs para monitoramento (Fire-and-forget)
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
        service: "portfolio-middleware",
        level: "info",
        locale,
        theme,
        path: pathname,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Fail silent
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const theme = request.cookies.get("theme")?.value ?? "system";

  // 🛡️ Filtro de Exclusão: Ignora arquivos internos e assets estáticos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|pdf|txt|xml|json)$/)
  ) {
    return NextResponse.next();
  }

  // Verifica se o pathname já possui um locale válido
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    if (process.env.LOGTAIL_TOKEN) {
      sendLog(locale, pathname, theme).catch(() => {});
    }

    // URL de redirecionamento mantendo query parameters (ex: ?source=linkedin)
    const redirectUrl = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
      request.url
    );
    
    return NextResponse.redirect(redirectUrl);
  }

  // 🔄 Injeção de Headers úteis para Server Components
  const currentLocale = pathname.split("/")[1] || defaultLocale;
  const requestHeaders = new Headers(request.headers);
  
  requestHeaders.set("x-theme", theme);
  requestHeaders.set("x-locale", currentLocale);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Otimização do matcher para evitar execuções desnecessárias
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
  ],
};

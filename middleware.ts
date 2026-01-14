import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

const locales = ["pt", "en", "es"] as const;
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value?.toLowerCase();
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const languages = new Negotiator({ headers }).languages();
    return matchLocale(languages, [...locales], defaultLocale);
  } catch (e) {
    return defaultLocale;
  }
}

/**
 * 📊 Envio de logs para monitoramento
 */
async function sendLog(locale: string, pathname: string, theme: string, request: NextRequest) {
  const token = process.env.LOGTAIL_TOKEN;
  if (!token) return;
  
  // Captura IP e User-Agent para enriquecer seus dados de Analytics
  const ua = request.headers.get("user-agent") || "unknown";
  const ip = request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    // Usamos fetch padrão do Next.js Runtime
    await fetch("https://in.logs.betterstack.com", { // URL atualizada do Better Stack
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        dt: new Date().toISOString(),
        message: `Page view: ${pathname}`,
        service: "portfolio-nextjs",
        level: "info",
        context: {
          locale,
          theme,
          path: pathname,
          user_agent: ua,
          client_ip: ip,
        }
      }),
    });
  } catch (error) {
    // Fail silent para não quebrar a navegação do usuário
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const theme = request.cookies.get("theme")?.value ?? "system";

  // 1. Ignora arquivos estáticos e internos IMEDIATAMENTE
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|pdf|txt|xml|json|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Verifica se o pathname já possui um locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. Se NÃO tem locale, decide o idioma, loga e redireciona
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // Dispara o log sem 'await' para não atrasar o carregamento (Fire-and-forget)
    sendLog(locale, pathname, theme, request).catch(() => {});

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // 4. Se JÁ TEM locale, apenas injeta os headers para os componentes
  const currentLocale = pathname.split("/")[1] || defaultLocale;
  const requestHeaders = new Headers(request.headers);
  
  requestHeaders.set("x-theme", theme);
  requestHeaders.set("x-locale", currentLocale);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Matcher refinado para excluir tudo que não for página
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

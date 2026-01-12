/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Gera build standalone (útil para Docker e deploy customizado)
  output: "standalone",

  compiler: {
    // Remove console.log em produção, mas mantém warn e error
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Internacionalização (i18n) — alinhado com LanguageSwitcher
  i18n: {
    locales: ["pt", "en", "es"], // idiomas suportados
    defaultLocale: "pt",         // idioma padrão
  },

  // Compressão para melhor performance
  compress: true,

  // Configuração avançada de imagens
  images: {
    domains: ["avatars.githubusercontent.com"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
    formats: ["image/avif", "image/webp"], // formatos modernos
  },

  // Headers de segurança adicionais
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // ✅ Sugestão de CSP básica
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "font-src 'self' data:;",
              "connect-src 'self' https:;",
              "frame-ancestors 'none';",
            ].join(" "),
          },
        ],
      },
    ];
  },

  // Recursos experimentais úteis
  experimental: {
    typedRoutes: true, // gera tipos para links automaticamente
    optimizePackageImports: ["react", "react-dom"],
  },
};

module.exports = nextConfig;

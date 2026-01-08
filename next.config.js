/** @type {import('next').NextConfig} */ 
const nextConfig = {
  reactStrictMode: true,

  // Gera build standalone (útil para Docker e deploy customizado)
  output: "standalone",

  compiler: {
    // Remove console.log em produção (mantém console.error)
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Internacionalização (i18n)
  i18n: {
    locales: ["pt", "en"],   // idiomas suportados
    defaultLocale: "pt",     // idioma padrão
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
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

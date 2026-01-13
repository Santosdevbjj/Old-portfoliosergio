/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** 🛡️ Segurança e Console */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /** 🚀 Performance */
  compress: true,
  poweredByHeader: false, // Oculta que o site usa Next.js (boa prática de segurança)

  /** 🖼️ Otimização de Imagens */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // Permite imagens de dentro dos repositórios
      },
    ],
    // Tamanhos otimizados para layouts responsivos (Data Dashboards costumam ser pesados)
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
  },

  /** 🔄 Redirecionamentos de Idioma */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pt", // Redireciona a raiz para o idioma padrão
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

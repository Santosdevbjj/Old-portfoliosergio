/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** 🛡️ Segurança e Compilação */
  compiler: {
    // Remove consoles apenas em produção, mantendo erros para debugging no monitoramento
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /** 🚀 Performance e Headers */
  compress: true,
  poweredByHeader: false, 

  /** 🖼️ Otimização de Imagens (Vital para Performance de Dados) */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Adicionado para capas de artigos MDX
      },
    ],
    // Cache de imagens agressivo (1 ano) para melhorar LCP
    minimumCacheTTL: 31536000,
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
  },

  /** 📝 Configuração para MDX */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  /** 🔄 Configurações Experimentais (Next.js 15) */
  experimental: {
    // Melhora a velocidade de compilação de arquivos MDX e componentes pesados
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  /** 🌐 Redirecionamentos */
  async redirects() {
    return [
      // Nota: O redirecionamento de "/" para "/pt" é opcional aqui 
      // se você já estiver tratando isso no middleware.ts. 
      // Mantivemos para garantir a fallback física.
      {
        source: "/",
        destination: "/pt",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

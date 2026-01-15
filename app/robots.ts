import { MetadataRoute } from "next";

/**
 * 🤖 Configuração do robots.txt
 * Controla indexação por mecanismos de busca e crawlers de IA.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfoliosergiosantos.vercel.app";

  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV !== "production";

  // 🔒 Em ambientes de preview/dev: bloquear tudo
  if (isPreview) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      /**
       * 🌍 Crawlers gerais (Google, Bing, etc.)
       */
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
        ],
      },

      /**
       * 🤖 Crawlers de IA
       * Permite leitura do portfólio técnico para contextualização e citações.
       * Obs: nomes de user-agent podem mudar conforme política dos providers.
       */
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
        ],
        allow: "/",
      },
    ],

    // 🗺️ Sitemap absoluto (boa prática de SEO)
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

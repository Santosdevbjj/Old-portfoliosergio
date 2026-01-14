import { MetadataRoute } from "next";

/**
 * 🤖 Configuração Dinâmica do Robots.txt
 * Gerencia a visibilidade do portfólio para mecanismos de busca e IAs.
 */
export default function robots(): MetadataRoute.Robots {
  // Prioriza a variável de ambiente para evitar URLs de preview da Vercel no robots oficial
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Protege lógica de backend
          "/_next/",    // Ignora artefatos de build do framework
          "/admin/",    // Área restrita
          "/private/",  // Pasta privada de rascunhos ou testes
          "/*?*",       // Evita indexar URLs com parâmetros de busca (previne conteúdo duplicado)
        ],
      },
      {
        /**
         * 🤖 AI Bots: Permite que modelos de linguagem indexem seu portfólio técnico.
         * Útil para ser citado em recomendações de talentos por IAs.
         */
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "Claude-Web"],
        allow: ["/"],
      }
    ],
    // Caminho absoluto para o sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

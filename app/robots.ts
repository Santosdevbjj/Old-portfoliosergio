import { MetadataRoute } from "next";

const baseUrl = "https://portfoliosergiosantos.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Evita indexar rotas de backend/servidor
          "/_next/",    // Evita indexar arquivos de build do framework
          "/private/",  // Protege pastas de rascunhos ou testes
          "/admin/",    // Protege possíveis rotas de gerenciamento
          "/*.json$",   // Evita que arquivos de configuração apareçam na busca
        ],
      },
      {
        // Regra amigável para buscadores de IA (opcional, mas recomendado para devs)
        userAgent: "GPTBot",
        allow: "/",
      }
    ],
    // Seguindo a recomendação de sitemap unificado que revisamos anteriormente
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

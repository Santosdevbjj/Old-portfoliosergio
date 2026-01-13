import { MetadataRoute } from "next";

/**
 * Configuração dinâmica do Robots.txt para Next.js 15.
 * Este arquivo ajuda no SEO internacional, garantindo que o Google 
 * e outros bots saibam exatamente o que indexar.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfoliosergiosantos.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Protege endpoints de servidor
          "/_next/",    // Evita indexar arquivos internos do framework
          "/private/",  // Protege ambientes de teste
          "/admin/",    // Garante segurança em rotas de gestão
          "/*.json$",   // Evita exposição de arquivos de metadados/config
        ],
      },
      {
        // Permite que bots de IA (como o da OpenAI) processem seu portfólio.
        // Isso é excelente para que você seja "encontrado" em buscas de IA.
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: "/",
      }
    ],
    // Aponta para o sitemap que gera as URLs localizadas ([lang])
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

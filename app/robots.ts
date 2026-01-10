import { MetadataRoute } from "next";

const baseUrl = "https://portfoliosergiosantos.vercel.app"; // ajuste para seu domínio real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"], // ajuste conforme suas rotas internas
      },
    ],
    // Em vez de listar cada sitemap, apontamos para o index
    sitemap: [`${baseUrl}/sitemap-index.xml`],
  };
}

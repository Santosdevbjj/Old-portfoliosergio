import { MetadataRoute } from "next";

const baseUrl = "https://seusite.com"; // ajuste para seu domínio real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"], // ajuste conforme suas rotas internas
      },
    ],
    sitemap: [
      `${baseUrl}/pt/sitemap.xml`,
      `${baseUrl}/en/sitemap.xml`,
      `${baseUrl}/es/sitemap.xml`,
    ],
  };
}

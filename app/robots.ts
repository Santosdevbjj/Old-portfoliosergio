import { MetadataRoute } from "next";
import { type Lang } from "@/lib/mdx";

const baseUrl = "https://portfoliosergiosantos.vercel.app/"; // ajuste para seu domínio real
const langs: Lang[] = ["pt", "en", "es"]; // importado de lib/mdx.ts

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"], // ajuste conforme suas rotas internas
      },
    ],
    sitemap: langs.map((lang) => `${baseUrl}/${lang}/sitemap.xml`),
  };
}

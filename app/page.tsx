// app/page.tsx
import { redirect } from "next/navigation";

/**
 * Este arquivo serve como o ponto de entrada da raiz.
 * Como estamos usando rotas dinâmicas por idioma [lang],
 * redirecionamos automaticamente para o idioma padrão (Português).
 * O middleware.ts também reforça esse comportamento.
 */
export default function RootPage() {
  redirect("/pt");
}

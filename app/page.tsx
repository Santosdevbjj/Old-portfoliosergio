import { redirect } from "next/navigation";
import { i18n } from "@/lib/i18n";

/**
 * ROOT REDIRECTOR
 * * Este arquivo lida com acessos à URL raiz (ex: portfoliosergiosantos.vercel.app/).
 * Ele redireciona imediatamente para o idioma padrão para evitar conteúdo duplicado
 * ou telas em branco antes do middleware atuar.
 */
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}

/** * Configuração de Runtime:
 * Forçamos como estático para que o redirecionamento aconteça no nível da Edge da Vercel,
 * tornando o processo instantâneo para o usuário.
 */
export const dynamic = "force-static";

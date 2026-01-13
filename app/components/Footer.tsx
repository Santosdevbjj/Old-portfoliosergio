"use client"; // Mantido para suportar interações se necessário

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import type { Translations, Locale } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
  navigation: Translations["navigation"];
  footer: Translations["footer"];
}

export default function Footer({ lang, navigation, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const htmlLangMap = { en: "en-US", es: "es-ES", pt: "pt-BR" };

  return (
    <footer
      className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors"
      aria-label="Site footer"
      lang={htmlLangMap[lang]}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* COLUNA 1: IDENTIDADE */}
          <div className="space-y-4 text-center md:text-left">
            <Link
              href={`/${lang}`}
              className="text-xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              SÉRGIO SANTOS
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto md:mx-0">
              {footer.description || "Engenheiro de Dados & Software focado em soluções escaláveis e inteligência de negócios."}
            </p>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO RÁPIDA */}
          <nav className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Menu
            </h3>
            {[
              { label: navigation.home, href: `/${lang}` },
              { label: navigation.about, href: `/${lang}/about` },
              { label: navigation.projects, href: `/${lang}/projects/list` },
              { label: navigation.contact || "Contact", href: `/${lang}/contact` },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* COLUNA 3: SOCIAL & CONEXÃO */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Social
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Santosdevbjj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/seuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:seuemail@exemplo.com"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Send Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* LINHA INFERIOR: COPYRIGHT */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
            © {currentYear} Sérgio Santos. {footer.rights}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-tighter">
            <span>Built with Next.js 15 & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

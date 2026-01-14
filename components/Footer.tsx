import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, Locale } from "@/lib/i18n";
import { Github, Linkedin, ArrowUp } from "lucide-react";

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const dict = getDictionary(lang);

  const connectLabel = {
    en: "Connect",
    es: "Conectar",
    pt: "Conectar",
  };

  const backToTopLabel = {
    en: "Back to top",
    es: "Volver arriba",
    pt: "Voltar ao topo",
  };

  return (
    <footer
      className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          
          {/* 1. IDENTIDADE & COPYRIGHT */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Link 
              href={`/${lang}`} 
              className="text-xl font-black tracking-tighter text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
            >
              SÉRGIO SANTOS
            </Link>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} — {dict.footer.rights}
            </p>
          </div>

          {/* 2. SOCIAL LINKS */}
          <div className="flex flex-col items-center space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
              {connectLabel[lang]}
            </span>
            <div className="flex gap-10 items-center">
              <a
                href="https://github.com/Santosdevbjj"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold opacity-0 group-hover:opacity-100 uppercase tracking-widest">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/santossergioluiz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold opacity-0 group-hover:opacity-100 uppercase tracking-widest">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* 3. LANGUAGE & NAVIGATION */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <LanguageSwitcher lang={lang} dict={dict.navigation} />
            
            {/* Link de âncora nativo (funciona sem JS e é mais leve) */}
            <a 
              href="#top"
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
            >
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              {backToTopLabel[lang]}
            </a>
          </div>
        </div>

        {/* MENSAGEM FINAL TÉCNICA */}
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-900/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.4em]">
              Data Engineering Portfolio
            </p>
            <div className="flex gap-4">
               <span className="h-1 w-1 rounded-full bg-blue-600" />
               <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
               <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.4em]">
              Next.js 15 • TypeScript • Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

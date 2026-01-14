"use client";

import { ReactNode, useState } from "react";
import { Info, AlertTriangle, CheckCircle, X } from "lucide-react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
  lang?: "pt" | "en" | "es";
}

export default function Callout({ children, type = "info", lang = "pt" }: CalloutProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Mapeamento de estilos focado em contraste e Dark Mode
  const styles = {
    info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200",
    warning: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200",
    success: "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200",
  };

  const icons = {
    info: <Info size={20} className="text-blue-600 dark:text-blue-400" />,
    warning: <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />,
    success: <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />,
  };

  const labels = {
    pt: { info: "Informação", warning: "Atenção", success: "Sucesso", close: "Fechar" },
    en: { info: "Info", warning: "Warning", success: "Success", close: "Close" },
    es: { info: "Información", warning: "Atención", success: "Éxito", close: "Cerrar" },
  };

  return (
    <div
      className={`
        relative my-8 flex items-start gap-4 rounded-2xl border-l-4 p-5 
        shadow-sm transition-all duration-300 animate-in fade-in zoom-in-95
        ${styles[type]}
      `}
      role="note"
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      
      <div className="flex-1 text-sm md:text-base leading-relaxed">
        <span className="block font-black uppercase tracking-widest text-[10px] mb-2 opacity-70">
          {labels[lang][type]}
        </span>
        <div className="prose-p:my-0 prose-slate dark:prose-invert font-medium">
          {children}
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="
          shrink-0 rounded-full p-1 
          hover:bg-black/5 dark:hover:bg-white/10 
          transition-colors duration-200
        "
        aria-label={labels[lang].close}
      >
        <X size={18} className="opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
}

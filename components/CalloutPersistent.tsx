"use client";

import { ReactNode, useEffect, useState } from "react";
import { Info, AlertTriangle, CheckCircle, X } from "lucide-react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
  lang?: "pt" | "en" | "es";
  id: string; // Identificador único para o localStorage
}

export default function CalloutPersistent({
  children,
  type = "info",
  lang = "pt",
  id,
}: CalloutProps) {
  // Inicializamos como false para evitar Hydration Mismatch
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const closed = localStorage.getItem(`callout-p-${id}`);
    if (closed !== "true") {
      setVisible(true);
    }
  }, [id]);

  // Se ainda não montou no cliente, não renderizamos nada para evitar erro de hidratação
  if (!isMounted || !visible) return null;

  const styles = {
    info: "border-blue-500 bg-blue-50/50 text-blue-900 dark:bg-blue-900/10 dark:text-blue-200",
    warning: "border-amber-500 bg-amber-50/50 text-amber-900 dark:bg-amber-900/10 dark:text-amber-200",
    success: "border-emerald-500 bg-emerald-50/50 text-emerald-900 dark:bg-emerald-900/10 dark:text-emerald-200",
  };

  const icons = {
    info: <Info size={20} className="text-blue-600 dark:text-blue-400" />,
    warning: <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />,
    success: <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />,
  };

  const labels = {
    pt: { info: "Nota", warning: "Atenção", success: "Sucesso", close: "Dispensar" },
    en: { info: "Note", warning: "Warning", success: "Success", close: "Dismiss" },
    es: { info: "Nota", warning: "Atención", success: "Éxito", close: "Descartar" },
  };

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem(`callout-p-${id}`, "true");
  };

  return (
    <div
      className={`
        relative my-6 flex items-start gap-4 rounded-3xl border-l-4 p-6 
        shadow-sm backdrop-blur-sm transition-all duration-500 
        animate-in fade-in slide-in-from-top-2
        ${styles[type]}
      `}
      role="status"
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      
      <div className="flex-1 text-sm md:text-base leading-relaxed">
        <span className="block font-black uppercase tracking-[0.2em] text-[10px] mb-2 opacity-60">
          {labels[lang][type]}
        </span>
        <div className="font-medium">
          {children}
        </div>
      </div>

      <button
        onClick={handleClose}
        className="
          shrink-0 rounded-full p-2 
          hover:bg-black/5 dark:hover:bg-white/10 
          transition-colors duration-200
        "
        aria-label={labels[lang].close}
      >
        <X size={18} className="opacity-40 hover:opacity-100 text-current" />
      </button>
    </div>
  );
}

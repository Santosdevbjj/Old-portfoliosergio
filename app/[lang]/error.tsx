"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para o console do desenvolvedor (visível no log da Vercel se for SSR)
    console.error("Critical Rendering Error:", error);

    const reportError = async () => {
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: "error",
            message: error.message || "Erro de renderização no cliente",
            stack: error.stack,
            digest: error.digest,
            url: typeof window !== "undefined" ? window.location.href : "unknown",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        // Falha silenciosa para não gerar um loop de erros
      }
    };

    reportError();
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <span className="text-4xl">⚠️</span>
      </div>
      
      <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Ops! Algo deu errado.
      </h2>
      
      <p className="mb-8 max-w-md text-lg text-slate-600 dark:text-slate-400">
        Ocorreu um erro inesperado na renderização desta página. Nossa equipe técnica foi notificada automaticamente.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 shadow-blue-500/20"
        >
          Tentar novamente
        </button>
        
        <button
          onClick={() => window.location.href = "/"}
          className="rounded-2xl bg-slate-200 px-8 py-3 font-bold text-slate-900 transition-all hover:bg-slate-300 active:scale-95 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          Voltar para Home
        </button>
      </div>

      {error.digest && (
        <p className="mt-10 text-xs font-mono text-slate-400 dark:text-slate-500">
          ID do erro: {error.digest}
        </p>
      )}
    </div>
  );
}

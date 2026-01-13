"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
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
            url: window.location.href,
          }),
        });
      } catch (e) {
        // Falha silenciosa para o usuário
      }
    };

    reportError();
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold dark:text-white">Algo não saiu como esperado</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        O erro foi registrado e nossa equipe técnica já foi notificada.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-slate-900 px-8 py-3 font-medium text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Tentar novamente
      </button>
    </div>
  );
}

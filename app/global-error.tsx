"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aqui você integraria um serviço de log como Sentry ou LogRocket
    console.error("Critical Runtime Error:", error);
  }, [error]);

  return (
    <html lang="pt">
      <body className="bg-slate-950 text-slate-50 antialiased font-sans">
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 text-center">
          {/* Ícone de Alerta Animado */}
          <div className="mb-6 rounded-full bg-red-500/10 p-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>

          <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">
            Erro Crítico de Renderização
          </h1>
          
          <p className="mt-4 max-w-md text-slate-400 text-lg leading-relaxed">
            Ocorreu uma falha inesperada no núcleo da aplicação. Isso pode ser um problema temporário de conexão ou cache.
          </p>

          {error.digest && (
            <code className="mt-6 rounded bg-slate-900 px-3 py-1 text-xs text-slate-500 font-mono">
              ID do Erro: {error.digest}
            </code>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              <RefreshCcw className="h-4 w-4" />
              Tentar Novamente
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all hover:bg-slate-700 active:scale-95"
            >
              <Home className="h-4 w-4" />
              Voltar ao Início
            </a>
          </div>

          <footer className="absolute bottom-8 text-sm text-slate-600">
            Sérgio Santos • Data & Software Engineering
          </footer>
        </div>
      </body>
    </html>
  );
}

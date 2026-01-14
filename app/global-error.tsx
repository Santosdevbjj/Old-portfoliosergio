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
    // 1. Log no console
    console.error("Critical Global Error:", error);

    // 2. Reporte para o seu Proxy de Log
    const report = async () => {
      try {
        await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: "fatal",
            message: error.message || "Global Runtime Crash",
            digest: error.digest,
            stack: error.stack?.substring(0, 500),
            source: "global-error-boundary"
          }),
        });
      } catch (e) {
        // Falha silenciosa
      }
    };
    report();
  }, [error]);

  return (
    <html>
      <body className="bg-slate-950 text-slate-50 antialiased font-sans flex min-h-screen w-full flex-col items-center justify-center p-6 text-center">
        {/* Ícone com Brilho Sutil */}
        <div className="mb-8 rounded-3xl bg-red-500/10 p-6 border border-red-500/20 shadow-2xl shadow-red-500/5">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
          System Critical Error
        </h1>
        
        <p className="max-w-md text-slate-400 text-lg md:text-xl leading-relaxed font-medium mb-10">
          Ocorreu uma falha no núcleo da aplicação. O incidente foi registrado para análise técnica.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-10 py-4 font-black text-xs uppercase tracking-widest text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
          >
            <RefreshCcw className="h-4 w-4" />
            Reiniciar App
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center justify-center gap-3 rounded-2xl bg-slate-800 px-10 py-4 font-black text-xs uppercase tracking-widest text-white transition-all hover:bg-slate-700 hover:scale-105 active:scale-95"
          >
            <Home className="h-4 w-4" />
            Voltar à Home
          </button>
        </div>

        {error.digest && (
          <div className="mt-16 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <code className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">
              Incident ID: {error.digest}
            </code>
          </div>
        )}

        <footer className="mt-20 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
          Sérgio Santos • Infrastructure Integrity
        </footer>
      </body>
    </html>
  );
}

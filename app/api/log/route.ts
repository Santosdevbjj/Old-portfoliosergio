import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Validação básica do corpo da requisição
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json({ error: "Corpo do log inválido" }, { status: 400 });
    }

    const token = process.env.LOGTAIL_TOKEN;

    // Se o token não estiver configurado, logamos no console da Vercel e falhamos graciosamente
    if (!token) {
      console.warn("⚠️ LOGTAIL_TOKEN não encontrado nas variáveis de ambiente.");
      // Retornamos 202 (Accepted) para o cliente não achar que o app quebrou, 
      // mas o log não será enviado ao provedor externo.
      return NextResponse.json({ warning: "Logs desativados no servidor" }, { status: 202 });
    }

    /** * 2. Repassa o log para o Logtail (BetterStack)
     * Adicionamos um timeout para evitar que a função serverless rode por muito tempo
     */
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de limite

    const response = await fetch("https://in.logtail.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        dt: new Date().toISOString(), // Logtail prefere 'dt' para timestamp
        source: "portfolio-nextjs-proxy",
        environment: process.env.NODE_ENV,
        vercel_region: process.env.VERCEL_REGION || "local"
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Logtail respondeu com erro: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: "Falha ao persistir log" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("❌ Timeout ao enviar log para Logtail");
    } else {
      console.error("❌ Erro interno no Proxy de Log:", error);
    }
    
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message }, 
      { status: 500 }
    );
  }
}

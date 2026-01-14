import { NextResponse } from "next/server";

// Next.js 15 Runtime: Define explicitamente como dinâmico para evitar cache de POST
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // 1. Validação do corpo da requisição
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json({ error: "Invalid log body" }, { status: 400 });
    }

    const token = process.env.LOGTAIL_TOKEN;

    // Fail-safe: Se o token sumir, o site não trava
    if (!token) {
      console.warn("⚠️ LOGTAIL_TOKEN is missing. Logging to stdout only.");
      console.log("Client Log:", body);
      return NextResponse.json({ warning: "Server-side logging disabled" }, { status: 202 });
    }

    /** * 2. Proxying para Logtail (BetterStack)
     * Implementação com AbortSignal para gerenciar latência em Edge Functions
     */
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // Reduzido para 4s (Edge Best Practice)

    const response = await fetch("https://in.logtail.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
        dt: new Date().toISOString(),
        source: "portfolio-v15",
        environment: process.env.NODE_ENV,
        vercel_region: process.env.VERCEL_REGION || "local",
        user_agent: request.headers.get("user-agent") || "unknown"
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`❌ Logtail Error: ${response.status}`);
      return NextResponse.json({ error: "Failed to persist log" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("❌ Timeout sending log to Logtail");
    } else {
      console.error("❌ Internal Proxy Error:", error);
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

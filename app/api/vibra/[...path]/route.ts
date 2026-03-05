import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy para a API PROXY_VIBRA_ELASTIC.
 * Necessário porque o certificado SSL da API externa é inválido/auto-assinado,
 * o que faz a Vercel rejeitar as requisições.
 *
 * A rota espelha qualquer path recebido:
 *   /api/vibra/v1/BandArticle/foo  →  PROXY_VIBRA_ELASTIC/api/v1/BandArticle/foo
 */

// Agent com SSL desabilitado — usado APENAS neste proxy server-side
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const base = process.env.PROXY_VIBRA_ELASTIC;

  if (!base) {
    return NextResponse.json(
      { error: 'PROXY_VIBRA_ELASTIC não configurado' },
      { status: 500 }
    );
  }

  const upstreamUrl = `${base}/api/${path.join('/')}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      // @ts-expect-error — `agent` é uma extensão do Node.js fetch (undici)
      agent: insecureAgent,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${upstream.status} ${upstream.statusText}` },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();

    return NextResponse.json(data, {
      headers: {
        // Permite que o cache do Next.js / Vercel aproveite a resposta
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('[VIBRA PROXY] Erro ao chamar upstream', {
      url: upstreamUrl,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: 'Falha ao conectar com a API upstream' },
      { status: 502 }
    );
  }
}

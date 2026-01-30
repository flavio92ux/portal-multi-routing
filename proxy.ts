// proxy.ts (CORRIGIDO)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/api/content?path=exemplo/artigo`
  );

  const data = await response.json();

  // Cria a resposta com o header antes de fazer o rewrite
  const dataString = Buffer.from(JSON.stringify(data)).toString('base64');

  let rewriteUrl = url.clone();

  if (hostname === process.env.NEXT_PUBLIC_RECIPES_HOSTNAME) {
    rewriteUrl.pathname = `/band-receitas${rewriteUrl.pathname}`;
  } else if (hostname === process.env.NEXT_PUBLIC_PORTAL_HOSTNAME) {
    rewriteUrl.pathname = `/band${rewriteUrl.pathname}`;
  }

  const nextResponse = NextResponse.rewrite(rewriteUrl);
  nextResponse.headers.set('x-page-data', dataString); // Use dataString, não 'abc'

  return nextResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  if (hostname === process.env.RECIPES_HOSTNAME) {
    url.pathname = `/receitas${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === process.env.PORTAL_HOSTNAME) {
    url.pathname = `/portal${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    /*
     * Ignora todos os caminhos que não sejam rotas de página:
     * - _next/static (arquivos compilados)
     * - _next/image (otimização de imagens)
     * - favicon.ico, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
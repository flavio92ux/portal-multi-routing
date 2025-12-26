import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Define o redirecionamento interno baseado no domínio
  if (hostname === process.env.RECIPES_HOSTNAME) {
    url.pathname = `/receitas${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === process.env.PORTAL_HOSTNAME) {
    url.pathname = `/portal${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
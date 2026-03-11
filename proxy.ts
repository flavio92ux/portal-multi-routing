import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isBand, isReceitas } from './utils/host';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  if (isReceitas(hostname)) {
    url.pathname = `/band-receitas${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (isBand(hostname)) {
    url.pathname = `/band${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)'],
};

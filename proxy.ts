import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  if (hostname === process.env.NEXT_PUBLIC_RECIPES_HOSTNAME) {
    url.pathname = `/band-receitas${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === process.env.NEXT_PUBLIC_PORTAL_HOSTNAME) {
    url.pathname = `/band${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)'],
};

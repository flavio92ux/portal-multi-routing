import { NextResponse } from 'next/server';

export async function GET() {

return new NextResponse('ok', {
    headers: {
      'Content-Type': 'application/text',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });

}
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 });
  }

  try {
    const thumbUrl = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandArticle/${path}`;
    const res = await fetch(thumbUrl, {
      next: { revalidate: 86400 }, // cache de 24h igual ao SSR
    });

    if (!res.ok) {
      return NextResponse.json({ thumb: '' }, { status: 200 });
    }

    const data = await res.json();
    const thumb = data?.config?.order?.data?.image?.url || '';

    return NextResponse.json({ thumb }, { status: 200 });
  } catch {
    return NextResponse.json({ thumb: '' }, { status: 200 });
  }
}

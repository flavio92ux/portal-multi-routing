'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  mapMaisLidasApiToComponent,
  type MaisLidasItem,
} from '@/lib/mappers/map-mais-lidas';
import { getChannel } from '@/utils/getChannel';

function buildMaisLidasUrl(channel: string): string {
  return `https://apiconteudo.bs.vibra.digital/?query={ga4(dateRanges:[{startDate:"yesterday",endDate:"today"}],limit:5,channel:"${channel}",domain:"band"){url pageTitle}}`;
}

export function MaisLidasClient({ path }: { path: string }) {
  const [items, setItems] = useState<MaisLidasItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channel = getChannel(path);

    async function fetchData() {
      try {
        const res = await fetch(buildMaisLidasUrl(channel));
        if (!res.ok) return;

        const data = await res.json();
        const maisLidasItems = mapMaisLidasApiToComponent(data);

        if (maisLidasItems.length > 0) {
          const thumbRes = await fetch(
            `/api/mais-lidas-thumb?path=${encodeURIComponent(maisLidasItems[0].href)}`
          );
          if (thumbRes.ok) {
            const thumbData = await thumbRes.json();
            maisLidasItems[0].thumb = thumbData?.thumb || '';
          }
        }

        setItems(maisLidasItems);
      } catch (err) {
        console.error('Erro ao carregar Mais Lidas (client):', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [path]);

  if (loading) {
    return (
      <aside className="w-full">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-t-primary border-t-10 px-4 py-3">
            <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-3 px-4 py-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4 py-2">
                <div className="h-8 w-6 animate-pulse rounded bg-gray-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-t-primary border-t-10 px-4 py-3">
          <h3 className="text-primary text-[20px] leading-7 font-bold">
            Mais Lidas
          </h3>
        </div>

        {/* Featured image for first item */}
        {items[0]?.thumb && (
          <Link
            href={items[0].href}
            className="relative block px-4 py-3 no-underline"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={items[0].thumb}
                alt={items[0].title}
                className="h-40 w-full object-cover transition-transform hover:scale-105"
                width={500}
                height={160}
              />
            </div>
          </Link>
        )}

        {/* Articles List */}
        <ol className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-start gap-4 px-4 py-4 no-underline transition-colors hover:bg-gray-50"
              >
                <span
                  className={`font-caladea shrink-0 text-4xl leading-none font-bold ${
                    item.id === 1 ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {item.id}
                </span>
                <span className="text-sm leading-snug font-medium text-slate-950">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

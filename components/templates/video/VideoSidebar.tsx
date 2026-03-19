'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ArticleTag, RelatedVideoItem } from '@/types/article';
import { mapApiRelatedVideos } from '@/lib/mappers/vibraMapper';

interface VideoSidebarProps {
  tags: ArticleTag[];
}

export function VideoSidebar({ tags }: VideoSidebarProps) {
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        // Use first tag to find related videos
        const tagSlug = tags[0]?.slug || 'noticias';
        const API_URL = `https://api.bs.vibra.digital/api/v1/BandVideo?sort=-createdAt&limit=5&config.order.data.tags.id.keyword=videos-${tagSlug}`;

        const res = await fetch(API_URL);
        const data = await res.json();
        const mapped = mapApiRelatedVideos(data);
        setRelatedVideos(mapped);
      } catch (error) {
        console.error('Failed to fetch related videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [tags]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex animate-pulse gap-3">
            <div className="h-16 w-28 shrink-0 rounded bg-gray-300" />
            <div className="flex-1">
              <div className="h-3 w-full rounded bg-gray-300" />
              <div className="mt-1 h-3 w-2/3 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (relatedVideos.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {relatedVideos.map((video) => (
        <Link
          key={video.id}
          href={video.href}
          className="group flex gap-3 no-underline"
        >
          <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded">
            <Image
              src={video.thumb}
              alt={video.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                <Play
                  className="text-foreground h-3.5 w-3.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-foreground line-clamp-3 text-xs leading-tight font-medium">
              {video.title}
            </h3>
          </div>
        </Link>
      ))}

      <Link
        href="/videos"
        className="bg-primary mt-2 flex items-center justify-center gap-2 rounded px-4 py-2 text-xs font-medium text-white no-underline transition-opacity hover:opacity-90"
      >
        Assista a outros videos e inteiras em Bandplay
      </Link>
    </div>
  );
}

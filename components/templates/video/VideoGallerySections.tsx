'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ChevronDown } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { RelatedVideoItem } from '@/types/article';
import { mapApiRelatedVideos } from '@/lib/mappers/vibraMapper';

interface VideoSection {
  title: string;
  tagId: string;
  videos: RelatedVideoItem[];
  hasMore: boolean;
  loading: boolean;
}

const VIDEO_SECTIONS_CONFIG = [
  { title: 'Videos em alta', tagId: 'noticias' },
  { title: 'Band Jornalismo', tagId: 'jornalismo' },
  { title: 'Esporte na Band', tagId: 'esportes' },
  { title: 'Band Entreterimento', tagId: 'entreterimento' },
];

function VideoCard({ video, index }: { video: RelatedVideoItem; index?: number }) {
  return (
    <Link
      href={video.href}
      className="group relative min-w-0 flex-[0_0_calc(50%-8px)] shrink-0 no-underline sm:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(25%-12px)]"
    >
      <div className="relative overflow-hidden rounded">
        <Image
          src={video.thumb}
          alt={video.title}
          width={320}
          height={180}
          className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
            <Play className="text-foreground h-5 w-5" fill="currentColor" />
          </div>
        </div>
        {index !== undefined && (
          <div className="text-primary absolute bottom-2 left-2 text-2xl font-bold">
            {index + 1}
          </div>
        )}
      </div>
      <h3 className="text-foreground mt-2 line-clamp-2 text-xs leading-snug font-bold">
        {video.title}
      </h3>
      {video.date && (
        <p className="text-cinza-secundario mt-1 text-[10px]">
          {new Date(video.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      )}
    </Link>
  );
}

function VideoSectionRow({ section, showIndex }: { section: VideoSection; showIndex?: boolean }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  if (section.loading) {
    return (
      <section className="py-6">
        <div className="mx-auto max-w-325 px-4">
          <div className="border-primary mb-4 border-l-4 pl-3">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-300" />
          </div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-[0_0_calc(25%-12px)] shrink-0 animate-pulse">
                <div className="aspect-video w-full rounded bg-gray-300" />
                <div className="mt-2 h-4 w-full rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.videos.length === 0) return null;

  return (
    <section className="py-6">
      <div className="mx-auto max-w-325 px-4">
        <div className="border-primary mb-4 border-l-4 pl-3">
          <h2 className="text-foreground text-lg font-bold">{section.title}</h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {section.videos.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                index={showIndex ? idx : undefined}
              />
            ))}
          </div>
        </div>

        {section.hasMore && (
          <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-1 rounded border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Carregar mais
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function VideoGallerySections() {
  const [sections, setSections] = useState<VideoSection[]>(
    VIDEO_SECTIONS_CONFIG.map((config) => ({
      ...config,
      videos: [],
      hasMore: true,
      loading: true,
    }))
  );

  useEffect(() => {
    const fetchSections = async () => {
      const updatedSections = await Promise.all(
        VIDEO_SECTIONS_CONFIG.map(async (config) => {
          try {
            const API_URL = `https://api.bs.vibra.digital/api/v1/BandVideo?sort=-createdAt&limit=4&config.order.data.tags.id.keyword=videos-${config.tagId}`;
            const res = await fetch(API_URL);
            const data = await res.json();
            const videos = mapApiRelatedVideos(data);

            return {
              ...config,
              videos,
              hasMore: videos.length >= 4,
              loading: false,
            };
          } catch (error) {
            console.error(`Failed to fetch videos for ${config.title}:`, error);
            return {
              ...config,
              videos: [],
              hasMore: false,
              loading: false,
            };
          }
        })
      );

      setSections(updatedSections);
    };

    fetchSections();
  }, []);

  return (
    <div className="bg-[#f5f5f5]">
      {sections.map((section, idx) => (
        <VideoSectionRow
          key={section.tagId}
          section={section}
          showIndex={idx === 0} // Show numbered index only for first section (Videos em alta)
        />
      ))}
    </div>
  );
}

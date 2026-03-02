'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const RelatedVideos = dynamic(
  () => import('./RelatedVideos').then((mod) => mod.RelatedVideos),
  {
    ssr: false,
    loading: () => (
      <div className="bg-[#f5f5f5] py-8">
        <div className="mx-auto max-w-325 px-4">
          <div className="mb-5 h-6 w-40 animate-pulse rounded bg-gray-300" />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-[0_0_calc(25%-12px)] shrink-0 animate-pulse"
              >
                <div className="aspect-video w-full rounded bg-gray-300" />
                <div className="mt-2 h-4 w-full rounded bg-gray-300" />
                <div className="mt-1 h-3 w-24 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export function RelatedVideosWrapper() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '300px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-64 w-full bg-[#f5f5f5]">
      {shouldRender && <RelatedVideos />}
    </div>
  );
}

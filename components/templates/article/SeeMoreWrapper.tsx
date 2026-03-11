'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { RelatedArticle } from '@/types/article';

const SeeMoreDynamic = dynamic(
  () => import('./SeeMore').then((mod) => mod.SeeMore),
  { ssr: false }
);

export function SeeMoreWrapper({ data }: { data?: RelatedArticle[] }) {
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
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) return null;

  return (
    <div ref={containerRef} className="min-h-64 w-full">
      {shouldRender && <SeeMoreDynamic data={data} />}
    </div>
  );
}

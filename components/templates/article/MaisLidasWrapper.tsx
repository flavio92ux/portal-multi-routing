'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MaisLidasClientDynamic = dynamic(
  () => import('./MaisLidasClient').then((mod) => mod.MaisLidasClient),
  { ssr: false }
);

export function MaisLidasWrapper({ path }: { path: string }) {
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

  return (
    <div ref={containerRef} className="min-h-64 w-full">
      {shouldRender && <MaisLidasClientDynamic path={path} />}
    </div>
  );
}

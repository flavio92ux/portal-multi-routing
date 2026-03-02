'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// O dynamic só será acionado quando o shouldRender for true
const BandplayBanner = dynamic(
  () => import('./BandplayBanner').then((mod) => mod.BandplayBanner),
  {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse bg-slate-900" />,
  }
);

export function BandplayBannerWrapper() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect(); // Para de observar após disparar o carregamento
        }
      },
      {
        rootMargin: '300px', // Começa a baixar o JS e carregar o banner 300px antes de aparecer
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-64 w-full bg-slate-900">
      {shouldRender && <BandplayBanner />}
    </div>
  );
}

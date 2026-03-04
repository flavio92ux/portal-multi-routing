'use client';

import { useEffect, useRef, useState } from 'react';
import { EmbedBlock } from '@/types/article';

/**
 * Renderiza um embed (YouTube, etc.) com lazy loading real.
 * - O container 16:9 é montado imediatamente → sem layout shift
 * - O <iframe> só recebe o `src` quando o elemento está a 200px de entrar no viewport
 */
export function LazyEmbed({ url, provider }: Pick<EmbedBlock, 'url' | 'provider'>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isYoutube = provider === 'youtube';

  return (
    <figure className="my-6 w-full">
      <div
        ref={wrapperRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: '56.25%' /* 16:9 */ }}
      >
        {isVisible ? (
          <iframe
            src={url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            title={isYoutube ? 'YouTube video' : 'Embedded content'}
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-16 w-16 text-white/40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </figure>
  );
}

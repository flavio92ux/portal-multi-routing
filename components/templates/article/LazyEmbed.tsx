'use client';

import { useEffect, useRef, useState } from 'react';
import { EmbedBlock } from '@/types/article';

/**
 * Renderiza um embed (YouTube, etc.) com lazy loading real.
 * - O container 16:9 é montado imediatamente → sem layout shift
 * - O <iframe> só recebe o `src` quando o elemento está a 200px de entrar no viewport
 * - Para o YouTube, carrega apenas a thumbnail inicialmente (facade), poupando banda e melhorando o Lighthouse.
 */
export function LazyEmbed({ url, provider }: Pick<EmbedBlock, 'url' | 'provider'>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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

  const isYoutube = provider === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be');

  // Extrair o ID do vídeo do YouTube para buscar a thumbnail
  const getYoutubeId = (urlToParse: string) => {
    if (!urlToParse) return null;
    
    // Fallback para URL dupla tipo https://www.youtube.com/embed/https://youtu.be/...
    if (urlToParse.includes('youtu.be/')) {
       const split = urlToParse.split('youtu.be/');
       const id = split[split.length - 1].split('?')[0].substring(0, 11);
       if (id.length === 11) return id;
    }
    
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlToParse.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  };

  const videoId = isYoutube ? getYoutubeId(url) : null;

  return (
    <figure className="my-6 w-full">
      <div
        ref={wrapperRef}
        className={`relative w-full overflow-hidden rounded-lg bg-black ${isYoutube && !isClicked && videoId ? 'cursor-pointer group' : ''}`}
        style={{ paddingBottom: '56.25%' /* 16:9 */ }}
        onClick={() => {
          if (isYoutube && !isClicked && videoId) setIsClicked(true);
        }}
      >
        {isVisible ? (
          isYoutube && !isClicked && videoId ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="Miniatura do Vídeo do YouTube"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-black/80 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#FF0000]">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={isYoutube && videoId && isClicked ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              title={isYoutube ? 'YouTube video' : 'Embedded content'}
              className="absolute inset-0 h-full w-full border-0"
            />
          )
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

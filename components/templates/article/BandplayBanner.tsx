'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  mapBandplayHighlightsToBanner,
  type BandplayBannerItem,
} from '@/lib/mappers/bandplayHighlightsMapper';

const BANDPLAY_HIGHLIGHTS_API =
  'https://api.bs.vibra.digital/api/v1/BandplayHighlights?sort=order&category=64e633c46a456746845107b5&limit=10';

export function BandplayBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [banners, setBanners] = useState<BandplayBannerItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Fetch data when component becomes visible
  useEffect(() => {
    if (hasFetched) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasFetched) {
          setHasFetched(true);
          setIsLoading(true);

          fetch(BANDPLAY_HIGHLIGHTS_API)
            .then((res) => res.json())
            .then((data) => {
              const mappedBanners = mapBandplayHighlightsToBanner(data);
              setBanners(mappedBanners);
            })
            .catch((error) => {
              console.error('Failed to fetch Bandplay highlights:', error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasFetched]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Show loading skeleton or nothing while loading
  if (isLoading || banners.length === 0) {
    return (
      <section ref={containerRef} className="w-full bg-slate-900">
        <div className="mx-auto max-w-325">
          <div className="flex h-64 items-center justify-center md:h-80">
            {isLoading && (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="w-full bg-slate-900">
      <div className="mx-auto max-w-325">
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {banners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.cta_link}
                className="relative min-w-full shrink-0"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />

                {/* Overlay escuro */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />

                {/* Content */}
                <div className="relative z-20 flex flex-col justify-center px-8 py-16 md:px-12 md:py-24">
                  {/* Logo Bandplay */}
                  <img
                    src={banner.logo}
                    alt="Bandplay"
                    className="mb-6 h-10 w-auto"
                  />

                  {/* Title */}
                  <h2 className="mb-4 font-sans text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {banner.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-8 max-w-md text-lg text-gray-300">
                    {banner.description}
                  </p>

                  {/* CTA Button */}
                  <button className="w-fit bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-3 font-bold text-white transition-opacity hover:opacity-90">
                    {banner.cta_text}
                  </button>
                </div>

                {/* Team/Event Logo - Right side */}
                <div className="absolute right-8 bottom-12 z-20 h-32 w-32 md:right-12 md:bottom-16 md:h-40 md:w-40">
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-6xl font-bold text-white/20 md:text-8xl">
                      ×
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between bg-slate-900 px-8 py-4 md:px-12">
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Banner anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:bg-white hover:text-slate-900 disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Ir para banner ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Próximo banner"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-colors hover:bg-white hover:text-slate-900 disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

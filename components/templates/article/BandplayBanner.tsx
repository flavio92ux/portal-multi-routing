'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados assim que o componente é montado (já no scroll)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BANDPLAY_HIGHLIGHTS_API);
        const data = await res.json();
        const mappedBanners = mapBandplayHighlightsToBanner(data);
        setBanners(mappedBanners);
      } catch (error) {
        console.error('Failed to fetch Bandplay highlights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center bg-slate-900 lg:h-[350px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="w-full bg-slate-900">
      <div className="mx-auto max-w-325">
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {banners.map((banner, index) => (
              <Link
                key={banner.id}
                href={banner.cta_link}
                className="relative flex min-h-[300px] min-w-full shrink-0 flex-col lg:h-[350px]"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    sizes="100vw"
                    quality={100}
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-900 via-slate-900/60 to-slate-900/10" />
                <div className="relative z-20 flex h-full flex-col justify-center px-8 py-10 md:px-12">
                  <div className="mb-4 w-fit">
                    <Image
                      src={banner.logo}
                      alt="Bandplay"
                      width={120}
                      height={48}
                      className="h-10 w-auto lg:h-12"
                    />
                  </div>
                  <h2 className="mb-2 font-sans text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {banner.title}
                  </h2>
                  <p className="mb-6 max-w-xl text-base text-gray-200 lg:text-lg">
                    {banner.description}
                  </p>
                  <button className="w-fit bg-linear-to-r from-teal-500 to-blue-600 px-6 py-2.5 font-bold text-white transition-opacity hover:opacity-90">
                    {banner.cta_text}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center justify-between bg-slate-900 px-8 py-4 md:px-12">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 w-2 rounded-full ${index === selectedIndex ? 'bg-white' : 'bg-gray-500'}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

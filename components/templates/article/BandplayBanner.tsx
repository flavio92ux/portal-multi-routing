'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function BandplayLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <text
        x="0"
        y="15"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="14"
      >
        {'▷ Bandplay'}
      </text>
    </svg>
  );
}

interface BannerSlide {
  id: number;
  title: string;
  description: string;
  href: string;
  leftLogo: string;
  rightLogo: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    title: 'Liga Saudita',
    description:
      'Duelo quente entre Al Okhdood x Al-Qadsiah. Quem leva a melhor?',
    href: '#',
    leftLogo: 'https://placehold.co/120x120/1a1a2e/e94560?text=AO',
    rightLogo: 'https://placehold.co/120x120/1a1a2e/e94560?text=AQ',
  },
  {
    id: 2,
    title: 'Champions League',
    description: 'Os melhores momentos da rodada. Confira os gols.',
    href: '#',
    leftLogo: 'https://placehold.co/120x120/1a1a2e/e94560?text=CL',
    rightLogo: 'https://placehold.co/120x120/1a1a2e/e94560?text=CL',
  },
];

export function BandplayBanner() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-[#0d0d2b] py-8">
      <div className="mx-auto flex max-w-325 items-center px-4">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Slide anterior"
          className="mr-4 shrink-0 text-white/60 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <BandplayLogo className="mb-2 h-5 w-auto" />
            <h3 className="text-lg font-bold text-white">{slide.title}</h3>
            <p className="mt-1 max-w-xs text-sm text-gray-300">
              {slide.description}
            </p>
            <Link
              href={slide.href}
              className="mt-3 inline-block rounded bg-white px-5 py-2 text-xs font-bold tracking-wider text-[#0d0d2b] uppercase no-underline transition-opacity hover:opacity-90"
            >
              ASSISTA GRATUITAMENTE
            </Link>
          </div>

          {/* Team logos */}
          <div className="flex items-center gap-4">
            <img
              src={slide.leftLogo}
              alt=""
              className="h-20 w-20 rounded-full object-contain md:h-28 md:w-28"
            />
            <span className="text-2xl font-bold text-white">X</span>
            <img
              src={slide.rightLogo}
              alt=""
              className="h-20 w-20 rounded-full object-contain md:h-28 md:w-28"
            />
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Proximo slide"
          className="ml-4 shrink-0 text-white/60 transition-colors hover:text-white"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === current ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

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
  image: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    title: 'Bora Brasil',
    description:
      'Comece o dia bem informado, acompanhando o que aconteceu no pais e em varios cantos do mundo.',
    href: '#',
    image: 'https://placehold.co/400x200/070d31/ffffff?text=Bora+Brasil',
  },
  {
    id: 2,
    title: 'Jornal da Band',
    description:
      'As principais noticias do dia com a credibilidade da Band.',
    href: '#',
    image: 'https://placehold.co/400x200/070d31/ffffff?text=Jornal+da+Band',
  },
];

export function BandplayBanner() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-[#070d31] py-8">
      <div className="mx-auto flex max-w-[1060px] items-center px-4">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Slide anterior"
          className="mr-4 shrink-0 text-white/50 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <BandplayLogo className="mb-2 h-5 w-auto" />
            <h3 className="text-xl font-bold text-white">{slide.title}</h3>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-[#a6a6a6]">
              {slide.description}
            </p>
            <Link
              href={slide.href}
              className="mt-4 inline-block rounded bg-[#f23030] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white no-underline transition-opacity hover:opacity-90"
            >
              ASSISTA GRATUITAMENTE
            </Link>
          </div>

          {/* Banner image */}
          <div className="shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-36 w-auto rounded object-cover md:h-44"
            />
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Proximo slide"
          className="ml-4 shrink-0 text-white/50 transition-colors hover:text-white"
        >
          <ChevronRight className="h-7 w-7" />
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

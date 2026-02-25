'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  date: string;
  thumb: string;
  href: string;
}

const videosMock: VideoItem[] = [
  {
    id: '1',
    title:
      'Santos com Maldo Soares, com os melhores eventos para o seu fim de semana',
    date: '25/04/2025 - 14:31',
    thumb: 'https://placehold.co/320x200/333/fff?text=Video+1',
    href: '#',
  },
  {
    id: '2',
    title: 'Pacientes denunciam larvas na comida da UPA em BH',
    date: '26/03/2024 - 17:10',
    thumb: 'https://placehold.co/320x200/333/fff?text=Video+2',
    href: '#',
  },
  {
    id: '3',
    title:
      'Caso Povel: medico que retirou orgaos de crianca viva em 2000 e preso',
    date: '16/05/2023 - 10:46',
    thumb: 'https://placehold.co/320x200/333/fff?text=Video+3',
    href: '#',
  },
  {
    id: '4',
    title:
      'Wallison recebe proposta quase 3 vezes maior e pode deixar o Cruzeiro',
    date: '08/10/2023 - 09:41',
    thumb: 'https://placehold.co/320x200/333/fff?text=Video+4',
    href: '#',
  },
];

export function RelatedVideos() {
  const [scrollPos, setScrollPos] = useState(0);

  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className="mx-auto max-w-325 px-4">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-bold">
            Videos Relacionados
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => setScrollPos(Math.max(0, scrollPos - 1))}
              aria-label="Videos anteriores"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setScrollPos(Math.min(videosMock.length - 1, scrollPos + 1))
              }
              aria-label="Proximos videos"
              className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:opacity-80"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videosMock.map((video) => (
            <Link
              key={video.id}
              href={video.href}
              className="group block no-underline"
            >
              <div className="relative overflow-hidden rounded">
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                    <Play
                      className="text-foreground h-5 w-5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-foreground mt-2 text-xs leading-snug font-bold">
                {video.title}
              </h3>
              <p className="text-cinza-secundario mt-1 text-[10px]">
                {video.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

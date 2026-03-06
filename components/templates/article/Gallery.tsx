"use client"

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GalleryProps } from "@/types/gallery";

export function Gallery({ galleryData }: GalleryProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };
    onSelect()

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }

  }, [emblaApi])

  if (galleryData?.gallery.length === 0) return null;

  return (
    <div className="max-w-full w-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className=" text-primary font-bold text-lg">Galeria de imagens</h2>
          <p className="text-base font-semibold mb-6">{galleryData?.title}</p>
        </div>
        <div className="flex items-center gap-2 text-red-600 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h4l2-2h4l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 4a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
          <span>{selectedIndex + 1}/{galleryData?.gallery.length}</span>
        </div>
      </div>
      <div className="w-full">
        <div className="relative rounded-lg overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {galleryData?.gallery.map((media, index) => (
              <div key={index} className="flex-[0_0_100%] relative">
                <Image
                  src={media.image.url}
                  alt={media.image.title || ''}
                  className="w-full h-130 rounded object-cover"
                  width={media.image.width}
                  height={media.image.height}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">
                    {media.image.title}
                  </h3>
                  <span className="text-sm opacity-80">{media.image.credit}</span>
                </div>
              </div>
            ))}
          </div>
          {!prevBtnDisabled && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {!nextBtnDisabled && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center"
              onClick={scrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
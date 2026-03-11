'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AdBlockProps {
  width: number | string;
  height: number | string;
  name: string;
  mobileWidth?: number | string;
  mobileHeight?: number | string;
  className?: string;
}

declare global {
  interface Window {
    googletag: any;
  }
}

export const AdBlock: React.FC<AdBlockProps> = ({
  width,
  height,
  name,
  mobileWidth,
  mobileHeight,
  className = '',
}) => {
  const normalizeSize = (size: number | string): string =>
    typeof size === 'number' ? `${size}px` : size;

  const widthStyle = normalizeSize(width);
  const heightStyle = normalizeSize(height);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px' } // Pre-load slightly before coming into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      !isVisible ||
      typeof window === 'undefined' ||
      !name ||
      !widthStyle ||
      !heightStyle
    )
      return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      window.googletag?.pubads()?.disableInitialLoad();

      const sizes: any[] = [];
      if (mobileWidth && mobileHeight) {
        sizes.push([Number(mobileWidth), Number(mobileHeight)]);
      }
      sizes.push([Number(width), Number(height)]);

      const slot = window.googletag.defineSlot(
        '/6355419/Travel/Europe/France/Paris',
        sizes,
        name
      );

      if (slot) {
        if (mobileWidth && mobileHeight) {
          const mapping = window.googletag
            .sizeMapping()
            .addSize([1024, 0], [[Number(width), Number(height)]])
            .addSize([0, 0], [[Number(mobileWidth), Number(mobileHeight)]])
            .build();
          slot.defineSizeMapping(mapping);
        }

        slot.addService(window.googletag.pubads());
      }

      window.googletag.enableServices();
      window.googletag.display(name);

      if (slot) {
        window.googletag.pubads().refresh([slot]);
      } else {
        window.googletag.pubads().refresh();
      }
    });
  }, [
    isVisible,
    widthStyle,
    heightStyle,
    mobileWidth,
    mobileHeight,
    name,
    width,
    height,
  ]);

  const mobileW = mobileWidth ? normalizeSize(mobileWidth) : widthStyle;
  const mobileH = mobileHeight ? normalizeSize(mobileHeight) : heightStyle;

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #wrapper-${name} {
          width: ${mobileW};
          height: ${mobileH};
        }
        @media (min-width: 1024px) {
          #wrapper-${name} {
            width: ${widthStyle};
            height: ${heightStyle};
          }
        }
      `,
        }}
      />
      <div
        id={`wrapper-${name}`}
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 ${className}`}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div id={name} />
        </div>
      </div>
    </div>
  );
};

export default AdBlock;

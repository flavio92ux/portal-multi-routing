'use client';

import React, { useEffect } from 'react';

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

  useEffect(() => {
    if (typeof window === 'undefined' || !name || !widthStyle || !heightStyle)
      return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(function () {
      window.googletag?.pubads()?.disableInitialLoad();
      window.googletag
        .defineSlot(
          '/6355419/Travel/Europe/France/Paris',
          [width, height],
          name
        )
        .addService(window.googletag.pubads());

      window.googletag.enableServices();
      window.googletag.display(name);
      window.googletag.pubads().refresh();
    });
  }, [widthStyle, heightStyle, name]);

  const AdInner = ({ w, h }: { w: string; h: string }) => (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 ${className}`}
      style={{ width: w, height: h }}
    >
      {/* <div className="text-center">
        <p className="font-semibold text-gray-500">Espaço Publicitário</p>
        <p className="text-sm text-gray-400">
          {w} × {h}
        </p>
      </div> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div id={name} style={{ minWidth: w, minHeight: h }} />
      </div>
    </div>
  );

  if (mobileWidth && mobileHeight) {
    const mobileWidthStyle = normalizeSize(mobileWidth);
    const mobileHeightStyle = normalizeSize(mobileHeight);

    return (
      <>
        {/* Mobile */}
        <div className="lg:hidden">
          <AdInner w={mobileWidthStyle} h={mobileHeightStyle} />
        </div>
        {/* Desktop */}
        <div className="hidden lg:block">
          <AdInner w={widthStyle} h={heightStyle} />
        </div>
      </>
    );
  }

  return <AdInner w={widthStyle} h={heightStyle} />;
};

export default AdBlock;

'use client';

import React, { useEffect } from 'react';

interface AdBlockProps {
  width: number | string;
  height: number | string;
  name: string;
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
  className = '',
}) => {
  // Normaliza valores para CSS
  const normalizeSize = (size: number | string): string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return size;
  };

  const widthStyle = normalizeSize(width);
  const heightStyle = normalizeSize(height);

  useEffect(() => {
    if (typeof window === 'undefined' || !name || !widthStyle || !heightStyle) return;

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

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
    >
      {/* <div className="text-center">
        <p className="font-semibold text-gray-500">Espaço Publicitário</p>
        <p className="text-sm text-gray-400">
          {widthStyle} × {heightStyle}
        </p>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div id={name} style={{ width: 300, height: 250 }} />
      </div>
    </div>
  );
};

export default AdBlock;

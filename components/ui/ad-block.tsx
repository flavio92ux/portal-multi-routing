'use client';

import React from 'react';

interface AdBlockProps {
  width: number | string;
  height: number | string;
  mobileWidth?: number | string;
  mobileHeight?: number | string;
  className?: string;
}

export const AdBlock: React.FC<AdBlockProps> = ({
  width,
  height,
  mobileWidth,
  mobileHeight,
  className = '',
}) => {
  const normalizeSize = (size: number | string): string =>
    typeof size === 'number' ? `${size}px` : size;

  const widthStyle = normalizeSize(width);
  const heightStyle = normalizeSize(height);

  const AdInner = ({ w, h }: { w: string; h: string }) => (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 ${className}`}
      style={{ width: w, height: h }}
    >
      <div className="text-center">
        <p className="font-semibold text-gray-500">Espaço Publicitário</p>
        <p className="text-sm text-gray-400">
          {w} × {h}
        </p>
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

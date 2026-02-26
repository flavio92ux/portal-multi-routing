'use client';

import React from 'react';

interface AdBlockProps {
  width: number | string;
  height: number | string;
  className?: string;
}

export const AdBlock: React.FC<AdBlockProps> = ({
  width,
  height,
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

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
    >
      <div className="text-center">
        <p className="font-semibold text-gray-500">Espaço Publicitário</p>
        <p className="text-sm text-gray-400">
          {widthStyle} × {heightStyle}
        </p>
      </div>
    </div>
  );
};

export default AdBlock;

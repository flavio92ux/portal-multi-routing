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
      className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
    >
      <div className="text-center">
        <p className="text-gray-500 font-semibold">Espaço Publicitário</p>
        <p className="text-gray-400 text-sm">
          {widthStyle} × {heightStyle}
        </p>
      </div>
    </div>
  );
};

export default AdBlock;

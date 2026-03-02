'use client';

import dynamic from 'next/dynamic';

const BandplayBanner = dynamic(
  () => import('./BandplayBanner').then((mod) => mod.BandplayBanner),
  { ssr: false }
);

export function BandplayBannerWrapper() {
  return <BandplayBanner />;
}

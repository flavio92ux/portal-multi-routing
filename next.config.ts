import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.band.uol.com.br',
      },
      {
        protocol: 'https',
        hostname: 'assets.spalla.io',
      },
      {
        protocol: 'https',
        hostname: 'img.band.com.br',
      },
      {
        protocol: 'https',
        hostname: 'pubimg.band.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.band.com.br',
      },
    ],
  },
};

export default nextConfig;

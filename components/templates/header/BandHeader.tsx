'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { headerMock } from '@/mocks/header-mock';
import { BandMobileMenu } from './BandMobileMenu';

export function BandHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navItems, liveStream, user } = headerMock;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#00784C]">
        <div className="flex h-12 items-center justify-between px-4">
          {/* Left side: hamburger + nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
              className="flex items-center justify-center text-white"
            >
              <Menu className="h-6 w-6" />
            </button>

            <nav className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white no-underline hover:text-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            href="/band"
            className="absolute left-1/2 -translate-x-1/2 no-underline"
            aria-label="Band.com.br - Pagina Inicial"
          >
            <BandLogo />
          </Link>

          {/* Right side: AO VIVO + user */}
          <div className="flex items-center gap-4">
            {liveStream.isLive && (
              <Link
                href={liveStream.href}
                className="hidden items-center gap-2 text-sm font-semibold text-white no-underline hover:text-white/80 md:flex"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                </span>
                {liveStream.label}
              </Link>
            )}

            <div className="hidden h-6 w-px bg-white/30 md:block" />

            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </div>
              <span className="hidden text-sm font-medium text-white md:inline">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      <BandMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

function BandLogo() {
  return (
    <svg
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-auto"
      aria-hidden="true"
    >
      {/* BAND text */}
      <text
        x="80"
        y="28"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="2"
      >
        BAND
      </text>
      {/* Dot */}
      <circle cx="133" cy="12" r="5" fill="white" />
      {/* .com.br */}
      <text
        x="80"
        y="46"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="11"
        letterSpacing="0.5"
      >
        .com.br
      </text>
    </svg>
  );
}

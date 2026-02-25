'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { HeaderData } from '@/types/menu-header';
import { BandMobileMenu } from './BandMobileMenu';
import { KickerBar } from './KickerBar';

interface BandHeaderProps {
  headerData: HeaderData;
}

export function BandHeader({ headerData }: BandHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo, navItems, liveStream, user, menuSections } = headerData;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#21262d]">
        <div className="mx-auto flex h-11 max-w-[960px] items-center justify-between px-4">
          {/* Left side: hamburger + nav */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
              className="flex items-center justify-center text-white"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav
              className="hidden items-center gap-4 md:flex"
              aria-label="Menu principal"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-medium text-white no-underline hover:text-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            href={logo.href}
            className="absolute left-1/2 -translate-x-1/2 no-underline"
            aria-label={logo.alt}
          >
            <Image
              src="https://img.band.com.br/image/2025/08/25/logo-da-band-10589.webp"
              alt={logo.alt}
              width={100}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Right side: AO VIVO + user */}
          <div className="flex items-center gap-3">
            {liveStream.isLive && (
              <Link
                href={liveStream.href}
                className="hidden items-center gap-1.5 rounded-sm bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white no-underline hover:bg-white/25 md:flex"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f23030] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f23030]" />
                </span>
                {liveStream.label}
              </Link>
            )}

            <div className="hidden h-5 w-px bg-white/30 md:block" />

            <div className="flex items-center gap-1.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-[11px] font-bold text-white"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </div>
              <span className="hidden text-[11px] font-medium text-white md:inline">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {menuSections[0].title && <KickerBar kicker={menuSections[0].title} />}

      <BandMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        headerData={headerData}
      />
    </>
  );
}

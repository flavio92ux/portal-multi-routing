'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { headerMock } from '@/mocks/header-mock';
import { BandMobileMenu } from './BandMobileMenu';

export function BandHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo, navItems, liveStream, user } = headerMock;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-primary">
        <div className="mx-auto flex h-11 max-w-5xl items-center justify-between px-4">
          {/* Left side: hamburger + nav */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menu"
              className="flex items-center justify-center text-primary-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav className="hidden items-center gap-4 md:flex" aria-label="Menu principal">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-primary-foreground no-underline hover:text-primary-foreground/80"
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
              src={logo.src}
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
                className="hidden items-center gap-1.5 rounded-sm bg-white/15 px-2.5 py-1 text-xs font-bold text-primary-foreground no-underline hover:bg-white/25 md:flex"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                {liveStream.label}
              </Link>
            )}

            <div className="hidden h-5 w-px bg-primary-foreground/30 md:block" />

            <div className="flex items-center gap-1.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary-foreground/30 text-xs font-bold text-primary-foreground"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </div>
              <span className="hidden text-xs font-medium text-primary-foreground md:inline">
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

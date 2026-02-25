'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, UserCircle, Pencil, LogOut } from 'lucide-react';
import { HeaderData } from '@/types/menu-header';

interface BandMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  headerData: HeaderData;
}

export function BandMobileMenu({
  isOpen,
  onClose,
  headerData,
}: BandMobileMenuProps) {
  const { user, menuSections, userMenuActions } = headerData;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <aside
        className={`fixed top-0 left-0 z-[70] flex h-full w-full max-w-[400px] flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex items-center justify-center text-gray-900"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <span className="text-lg font-bold tracking-wide text-gray-900">
            MENU
          </span>
        </div>

        <hr className="mx-5 border-gray-200" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8">
          {/* User section */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.initials}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{'Ola,'}</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.name}!
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mb-8 flex flex-col gap-3">
            <Link
              href={userMenuActions.minhaBand.href}
              className="flex items-center justify-center gap-2 rounded-full bg-[#00897B] py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#00796B]"
            >
              <UserCircle className="h-5 w-5" />
              {userMenuActions.minhaBand.label}
            </Link>
            <Link
              href={userMenuActions.editarPerfil.href}
              className="flex items-center justify-center gap-2 rounded-full bg-[#00897B] py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#00796B]"
            >
              <Pencil className="h-4 w-4" />
              {userMenuActions.editarPerfil.label}
            </Link>
            <Link
              href={userMenuActions.sairDaConta.href}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#00897B] py-3 text-sm font-semibold text-[#00897B] no-underline transition-colors hover:bg-[#00897B]/5"
            >
              <LogOut className="h-4 w-4" />
              {userMenuActions.sairDaConta.label}
            </Link>
          </div>

          {/* Menu sections */}
          {menuSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-1 py-2.5 text-base text-gray-700 no-underline transition-colors hover:bg-gray-50"
                    >
                      <span>{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

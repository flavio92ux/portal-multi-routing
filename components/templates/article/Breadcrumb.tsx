import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  headline: string;
}

export function Breadcrumb({ headline }: BreadcrumbProps) {
  return (
    <nav
      className="border-b border-[#dee2e7] bg-[#ffffff]"
      aria-label="Breadcrumb"
    >
      <div className="mx-auto max-w-[1060px] px-4 py-2.5">
        <ol className="flex items-center gap-1.5 text-xs text-[#737b8b]">
          <li>
            <Link
              href="/band"
              className="text-[#737b8b] no-underline hover:text-[#1d1d1d]"
            >
              Band
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#ced3db]">
            {'>'}
          </li>
          <li className="truncate text-primary no-underline">{headline}</li>
        </ol>
      </div>
    </nav>
  );
}

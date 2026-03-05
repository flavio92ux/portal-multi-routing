import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  headline: string;
}

export function Breadcrumb({ headline }: BreadcrumbProps) {
  return (
    <nav
      className="bg-background flex justify-center py-3"
      aria-label="Breadcrumb"
    >
      <div className="w-full px-[15px] py-2 lg:mx-auto lg:flex lg:justify-center lg:px-4">
        <ol className="text-cinza-secundario flex min-w-0 items-center gap-1.5 text-xs">
          <li>
            <Link
              href="/band"
              className="text-cinza-secundario hover:text-foreground text-[14px] leading-[18px] no-underline lg:leading-[24px]"
            >
              Band
            </Link>
          </li>
          <li aria-hidden="true">{'>'}</li>
          <li className="text-primary min-w-0 truncate text-[14px] leading-[18px] font-bold no-underline lg:leading-[24px]">
            {headline}
          </li>
        </ol>
      </div>
    </nav>
  );
}

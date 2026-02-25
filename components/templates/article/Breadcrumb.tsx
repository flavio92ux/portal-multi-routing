import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  headline: string;
}

export function Breadcrumb({ headline }: BreadcrumbProps) {
  return (
    <nav
      className="bg-background flex justify-center py-6"
      aria-label="Breadcrumb"
    >
      <div className="mx-auto max-w-5xl px-4 py-2">
        <ol className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <li>
            <Link
              href="/band"
              className="text-muted-foreground hover:text-foreground text-sm14 leading-4 no-underline"
            >
              Band
            </Link>
          </li>
          <li aria-hidden="true">{'>'}</li>
          <li className="text-primary text-sm14 truncate leading-4.75 font-bold no-underline">
            {headline}
          </li>
        </ol>
      </div>
    </nav>
  );
}

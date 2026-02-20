import React from 'react';
import { formatDate } from './formatDate';

interface AuthorInfoProps {
  author: {
    name: string;
  };
  dates?: {
    published_at?: string;
    updated_at?: string;
  };
}

export function AuthorInfo({ author, dates }: AuthorInfoProps) {
  return (
    <div className="mb-6">
      <p className="text-primary text-xs font-bold uppercase no-underline">
        {author.name}
      </p>
      {dates?.published_at && (
        <p className="text-muted-foreground text-xs">
          {formatDate(dates.published_at)}
          {dates.updated_at &&
            ` - Atualizado em ${formatDate(dates.updated_at)}`}
        </p>
      )}
    </div>
  );
}

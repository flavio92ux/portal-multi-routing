import { formatDate } from '@/utils/formatDate';

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
    <div className="mb-5 border-b border-[#dee2e7] pb-4">
      <p className="text-xs font-bold uppercase tracking-wide text-primary no-underline">
        {author.name}
      </p>
      {dates?.published_at && (
        <p className="mt-0.5 text-xs text-[#939daa]">
          {formatDate(dates.published_at)}
          {dates.updated_at &&
            ` - Atualizado em ${formatDate(dates.updated_at)}`}
        </p>
      )}
    </div>
  );
}

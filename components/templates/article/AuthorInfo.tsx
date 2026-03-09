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
    <div className="mb-6">
      <p className="text-primary text-xs leading-normal font-bold uppercase underline">
        {author.name}
      </p>
      {dates?.published_at && (
        <p className="text-cinza text-[12px] leading-normal font-semibold lg:text-[14px]">
          {formatDate(dates.published_at)}
          {dates.updated_at &&
            ` - Atualizado em ${formatDate(dates.updated_at)}`}
        </p>
      )}
    </div>
  );
}

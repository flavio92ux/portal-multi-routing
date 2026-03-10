import { formatDate } from '@/utils/formatDate';

interface AuthorInfoProps {
  author: {
    name: string;
    avatar?: string | null;
  };
  dates?: {
    published_at?: string;
    updated_at?: string;
  };
}

export function AuthorInfo({ author, dates }: AuthorInfoProps) {
  const isRedacao = author.name.toLowerCase().includes('redação');
  const avatarUrl = isRedacao
    ? 'https://flavio-franco-tester.fun/logo_band.webp'
    : author.avatar;

  const renderDate = (dateStr: string) => {
    return formatDate(dateStr).replace(' - ', ' \u2022 ');
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      {avatarUrl && (
        <div className="flex shrink-0 items-center justify-center">
          <img
            src={avatarUrl}
            alt={author.name}
            width={120}
            height={48}
            className="h-6 w-auto object-contain"
          />
        </div>
      )}
      <div>
        <p className="text-primary text-xs leading-normal font-bold uppercase">
          {/* <span className="text-slate-900">POR</span>{' '} */}
          <span className="underline">
            {author.name.toUpperCase().replace('POR ', '')}
          </span>
        </p>
        {dates?.published_at && (
          <p className="text-cinza text-[12px] leading-normal font-semibold lg:text-[14px]">
            {renderDate(dates.published_at)}
            {dates.updated_at &&
              ` \u2022 Atualizado em ${renderDate(dates.updated_at)}`}
          </p>
        )}
      </div>
    </div>
  );
}

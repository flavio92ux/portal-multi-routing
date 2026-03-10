import Link from 'next/link';

import { RelatedArticle } from '@/types/article';

export function SeeMore({ data }: { data?: RelatedArticle[] }) {
  if (!data || data.length === 0) return null;
  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-t-primary border-t-10 px-4 py-3">
          <h3 className="text-primary text-[20px] leading-7 font-bold">
            Veja também
          </h3>
        </div>

        <hr className="border-gray-200" />

        <div className="flex flex-col">
          {data.map((item, index) => {
            if (index === 0) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 no-underline transition-colors hover:bg-gray-50"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-40 w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h4 className="font-caladea text-[18px] leading-tight font-bold text-slate-950">
                    {item.title}
                  </h4>
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-start gap-4 px-4 py-4 no-underline transition-colors hover:bg-gray-50 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="relative shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[100px] w-[100px] object-cover transition-transform hover:scale-105"
                  />
                </div>
                <h4 className="font-caladea text-[16px] leading-tight font-bold text-slate-950">
                  {item.title}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

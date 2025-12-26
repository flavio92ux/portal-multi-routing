'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationToggle() {
  const router = useRouter();
  const [target, setTarget] = useState<'portal' | 'receitas' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;

    if (hostname.includes('receitas')) {
      setTarget('portal');
    } else if (hostname.includes('portal')) {
      setTarget('receitas');
    }
  }, []);

  const handleNavigate = () => {
    if (!target) return;

    setIsLoading(true);
    router.push(`/${target}`);
  };

  if (!target) return null;

  return (
    <h1>Ola</h1>
    // <button
    //   onClick={handleNavigate}
    //   disabled={isLoading}
    //   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    // >
    //   {isLoading ? 'Carregando...' : `Ir para ${target === 'portal' ? 'Portal' : 'Receitas'}`}
    // </button>
  );
}

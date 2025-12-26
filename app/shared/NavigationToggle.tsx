'use client';

import { useEffect, useState } from 'react';

export function NavigationToggle() {
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

    window.location.href = `http://${target}:3000/`;
  };

  if (!target) return null;

  return (
    <button
      onClick={handleNavigate}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Carregando...' : `Ir para ${target === 'portal' ? 'Portal' : 'Receitas'}`}
    </button>
  );
}

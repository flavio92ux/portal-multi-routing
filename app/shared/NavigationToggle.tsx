'use client';

import { useEffect, useState } from 'react';

export function NavigationToggle() {
  const [target, setTarget] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;

    const portalHostname = process.env.NEXT_PUBLIC_PORTAL_HOSTNAME;
    const recipesHostname = process.env.NEXT_PUBLIC_RECIPES_HOSTNAME;

    debugger

    if (!portalHostname || !recipesHostname) return;

    if (portalHostname.includes(hostname)) {
      setTarget(recipesHostname);
    } else {
      setTarget(portalHostname);
    }
  }, []);

  const handleNavigate = () => {
    if (!target) return;

    setIsLoading(true);

    window.location.href = `http://${target}`;
  };

  if (!target) return null;

  return (
    <button
      onClick={handleNavigate}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Carregando...' : `Ir para ${target.includes('portal') ? 'Portal' : 'Receitas'}`}
    </button>
  );
}

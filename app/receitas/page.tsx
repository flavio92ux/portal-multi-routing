'use client';

import { NavigationToggle } from '@/components/ui/NavigationToggle';

export default function Home() {
  const handleClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Receitas</h1>
      <div className="flex gap-4">
        <NavigationToggle />
      </div>
    </div>
  );
}

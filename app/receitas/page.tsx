'use client';

import { NavigationToggle } from '@/components/ui/NavigationToggle';

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <NavigationToggle />
      </div>
    </div>
  );
}

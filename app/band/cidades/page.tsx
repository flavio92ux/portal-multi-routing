// app/band/[...slug]/page.tsx
import { Button } from '@/components/ui/button';
import './cidades.css';

export default async function Page() {
  return (
    <div>
      <Button variant="default">
        portal:3000/cidades --var-primary definida como azul em globals.css e
        rosa em cidades.css
      </Button>
    </div>
  );
}

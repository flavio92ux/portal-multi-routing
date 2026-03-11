import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <div className="bg-primary">receitas:3000</div>
        <Button variant="default">Botão shadcn/ui Receitas</Button>
      </div>
    </div>
  );
}

import { NavigationToggle } from "@/components/ui/NavigationToggle";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
        <div className="p-6">
          <div className="flex gap-4">
            <NavigationToggle />
            <Button variant="default">Botão shadcn/ui Receitas</Button>
          </div>
        </div>
  );
}

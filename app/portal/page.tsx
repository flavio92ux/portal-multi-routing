import { NavigationToggle } from "../shared/NavigationToggle";

export default function Home() {
  return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Portal</h1>
          <div className="flex gap-4">
            <NavigationToggle />
          </div>
        </div>
  );
}

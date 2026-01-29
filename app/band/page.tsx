import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { Button } from '@/components/ui/button';

const theme = {
  primary: '#008000',
  primaryForeground: '#f7f3f2',
  secondary: '#4b1230',
  secondaryForeground: '#ffffff',
  background: '#ffffff',
  foreground: '#1a0f0a',
  card: '#fdfcfb',
  cardForeground: '#1a0f0a',
  muted: '#f5f3f1',
  mutedForeground: '#8b7f7c',
  accent: '#f75a5a',
  accentForeground: '#ffffff',
  destructive: '#e11d48',
  destructiveForeground: '#f8fafc',
  border: '#e8e0d9',
  input: '#e8e0d9',
  ring: '#9f2b68',
};

export default function Home() {
  return (
    <div className="p-6">
      <ThemeWrapper theme={theme}>
        <div className="flex gap-4">
          <div className="bg-primary">portal:3000</div>
          <Button variant="default">Botão shadcn/ui Portal</Button>
        </div>
      </ThemeWrapper>

      <div className="flex gap-4">
        <div className="bg-primary">portal:3000</div>
        <Button variant="default">Botão shadcn/ui Portal</Button>
      </div>
    </div>
  );
}

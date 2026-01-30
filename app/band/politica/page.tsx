import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { Button } from '@/components/ui/button';

export default function LocationPage() {
  const theme = {
    primary: '#9d00ff', // Purpura
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

  return (
    <>
      <ThemeWrapper theme={theme}>
        <div className="p-6">
          <div className="flex gap-4">
            <Button variant="default">
              portal:3000/politica usando variaveis fixas
            </Button>
          </div>
        </div>
      </ThemeWrapper>
    </>
  );
}

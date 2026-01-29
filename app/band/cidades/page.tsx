// app/band/[...slug]/page.tsx
import { ThemeWrapper } from '@/components/templates/ThemeWrapper';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const theme = {
    primary: '#ff0000', // Vermelho
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
    <ThemeWrapper theme={theme}>
      <Button variant="default">
        portal:3000/cidades usando variaveis dinamicas passando para portal.css
        na raiz de band, cor padrão roxa, cor personalizada vermelho
      </Button>
    </ThemeWrapper>
  );
}

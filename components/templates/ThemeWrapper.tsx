import { ArticleTheme } from '@/types/article';
import React from 'react';

export function ThemeWrapper({
  theme,
  children,
}: {
  theme: ArticleTheme;
  children: React.ReactNode;
}) {
  const dynamicStyles = {
    '--primary': theme.primary || '#ff0084',
    '--primary-foreground': theme.primaryForeground,
    '--secondary': theme.secondary,
    '--secondary-foreground': theme.secondaryForeground,
    '--background': theme.background,
    '--foreground': theme.foreground,
    '--card': theme.card,
    '--card-foreground': theme.cardForeground,
    '--muted': theme.muted,
    '--muted-foreground': theme.mutedForeground,
    '--accent': theme.accent,
    '--accent-foreground': theme.accentForeground,
    '--destructive': theme.destructive,
    '--destructive-foreground': theme.destructiveForeground,
    '--border': theme.border,
    '--input': theme.input,
    '--ring': theme.ring,
  } as React.CSSProperties;

  return (
    <div style={dynamicStyles} className="contents">
      {children}
    </div>
  );
}

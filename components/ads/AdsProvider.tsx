// app/components/ads/AdsProvider.tsx
'use client';

import { useEffect, useState } from 'react';

export function AdsProvider() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const injectGpt = () => {
      if (loaded) return;

      const script = document.createElement('script');
      script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      script.async = true;
      document.head.appendChild(script);

      window.googletag = window.googletag || { cmd: [] };
      window.googletag.cmd.push(() => {
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 200,
          renderMarginPercent: 100,
        });
        window.googletag.enableServices();
      });

      setLoaded(true);

      window.removeEventListener('scroll', injectGpt);
      window.removeEventListener('mousemove', injectGpt);
      window.removeEventListener('touchstart', injectGpt);
    };

    // Opção A: Delay puro (3 segundos é o "sweet spot" para o Lighthouse)
    const timer = setTimeout(injectGpt, 3000);

    // Opção B: Carregar na primeira interação (melhor para UX)
    window.addEventListener('scroll', injectGpt, { passive: true });
    window.addEventListener('mousemove', injectGpt, { passive: true });
    window.addEventListener('touchstart', injectGpt, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', injectGpt);
      window.removeEventListener('mousemove', injectGpt);
      window.removeEventListener('touchstart', injectGpt);
    };
  }, [loaded]);

  return null;
}

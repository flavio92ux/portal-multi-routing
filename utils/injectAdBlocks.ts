import { ArticleBlock } from '@/types/article';

export interface AdConfig {
  width: number | string;
  height: number | string;
  className?: string;
}

export interface AdBlock {
  type: 'ad-block';
  __isAd: true;
  __adConfig: AdConfig;
}

export type AdBlockWithId = (ArticleBlock | AdBlock) & {
  __isAd?: true;
  __adConfig?: AdConfig;
};

/**
 * Injeta blocos de publicidade após o primeiro parágrafo e depois a cada N parágrafos
 * Estratégia otimizada que evita recálculos desnecessários
 */
export function injectAdBlocksEveryNParagraphs(
  blocks: ArticleBlock[],
  everyNParagraphs: number = 3,
  adConfig: AdConfig = { width: 300, height: 250 }
): AdBlockWithId[] {
  const result: AdBlockWithId[] = [];
  let paragraphCount = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Adiciona o bloco atual
    result.push(block as AdBlockWithId);

    // Se for parágrafo, incrementa contador
    if (block.type === 'paragraph') {
      paragraphCount++;

      // Injeta AD após o 1º parágrafo ou a cada N parágrafos subsequentes (mas não no final)
      const shouldInjectAd =
        paragraphCount === 1 ||
        (paragraphCount > 1 && (paragraphCount - 1) % everyNParagraphs === 0);

      if (shouldInjectAd && i < blocks.length - 1) {
        result.push({
          type: 'ad-block',
          __isAd: true,
          __adConfig: adConfig,
        });
      }
    }
  }

  return result;
}

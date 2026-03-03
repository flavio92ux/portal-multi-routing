/**
 * Retorna o channel da API GA4 com base no path relativo da URL.
 *
 * Regras:
 * - Se o 1º ou 2º nível do path contiver "noticias", retorna "noticias"
 * - Caso contrário, retorna o 1º nível do path como channel
 *
 * Exemplos:
 * - /noticias/minha-materia                     → "noticias"
 * - /band-vale/noticias/minha-materia           → "noticias"
 * - /entretenimento/minha-materia               → "entretenimento"
 */
export function getChannel(path: string): string {
  const segments = path.split('/').filter(Boolean);

  const [first, second] = segments;

  if (first === 'noticias' || second === 'noticias') {
    return 'noticias';
  }

  return first ?? 'noticias';
}

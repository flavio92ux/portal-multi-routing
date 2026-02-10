/**
 * Verifica se uma URL/path é de um artigo
 * Artigos terminam com o padrão: -YYYYMMDDHHMM (hífen seguido de 14 dígitos)
 * Exemplo: /noticias/brasil-mantem-pior-posicao-....-202602100800
 *
 * @param path - O caminho ou URL a ser verificado
 * @returns true se é um artigo, false caso contrário
 */
export function isArticleUrl(path: string): boolean {
  const articlePattern = /-\d{14}$/;
  return articlePattern.test(path);
}

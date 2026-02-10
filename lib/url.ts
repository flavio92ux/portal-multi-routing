/**
 * Checks if a URL ends with a valid 12-digit article slug (YYYYMMDDHHmm).
 * @param url - The URL string to validate.
 * @returns True if the slug pattern is found at the end of the URL.
 */
export function isValidArticleSlug(url: string): boolean {
  const slugRegex = /\d{12}$/;
  return slugRegex.test(url);
}

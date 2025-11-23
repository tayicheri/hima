export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, "") // supprime les caractères non-alphanumériques
    .replace(/\-\-+/g, "-"); // remplace les doubles tirets par un seul
}

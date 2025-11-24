export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[^a-zA-Z0-9\s-]/g, "") // supprime caractères spéciaux sauf espaces et tirets
    .trim() // supprime les espaces au début et à la fin
    .replace(/\s+/g, "-") // remplace les espaces par des tirets
    .replace(/-+/g, "-") // remplace plusieurs tirets consécutifs par un seul
    .toLowerCase(); // convertit en minuscules
}

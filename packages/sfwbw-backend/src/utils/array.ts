export function countUnique(items: unknown[]): number {
  return new Set(items).size;
}

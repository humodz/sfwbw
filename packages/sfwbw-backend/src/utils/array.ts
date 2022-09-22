export function countUnique(items: unknown[]): number {
  return new Set(items).size;
}

export function first<T>(items: T[]): T | undefined {
  return items[0];
}

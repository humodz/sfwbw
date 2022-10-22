export function countUnique(items: unknown[]): number {
  return new Set(items).size;
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export function first<T>(items: T[]): T | undefined {
  return items[0];
}

export function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

export function repeat<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

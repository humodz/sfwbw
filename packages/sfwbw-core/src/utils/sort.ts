export type Compare<T> = (a: T, b: T) => number;

export const CompareTo = Symbol('CompareTo');

export const defaultCompare: Compare<any> = (a, b) => {
  if (a && a[CompareTo]) {
    return a[CompareTo](b);
  } else if (b && b[CompareTo]) {
    return -b[CompareTo](a);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return arrayCompare(a, b);
  } else {
    return simpleCompare(a, b);
  }
};

export const simpleCompare: Compare<any> = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

export const arrayCompare: Compare<any[]> = (a, b) => {
  const length = Math.min(a.length, b.length);

  for (let i = 0; i < length; i++) {
    const sign = defaultCompare(a[i], b[i]);

    if (sign !== 0) {
      return sign;
    }
  }

  return simpleCompare(a.length, b.length);
};

export function sorted<T>(
  items: Iterable<T>,
  compare: Compare<T> = defaultCompare,
): T[] {
  return [...items].sort(compare);
}

export function backwards<T>(compare: Compare<T> = defaultCompare): Compare<T> {
  return (a, b) => -compare(a, b);
}

export function by<T>(
  keyFn: (it: T) => unknown,
  compare: Compare<unknown> = defaultCompare,
): Compare<T> {
  return (a, b) => {
    const keyA = keyFn(a);
    const keyB = keyFn(b);
    return compare(keyA, keyB);
  };
}

export function descending(value: unknown, compare = defaultCompare): unknown {
  return {
    [CompareTo]: (other: unknown) => -compare(value, other),
  };
}

export * from './array';
export * from './sort';

export function isEnum<Enum extends Record<string, any>>(
  theEnum: Enum,
  value: any,
): value is Enum[keyof Enum] {
  return Object.values(theEnum).includes(value);
}

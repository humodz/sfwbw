export type RemoveSymbols<Type> = {
  [Property in keyof Type as Exclude<Property, symbol>]: Type[Property];
};

export function removeSymbols<T>(obj: T): RemoveSymbols<T> {
  return obj as any;
}

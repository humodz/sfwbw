type Falsy = null | undefined | false | 0 | '';
type Truthy<T> = Exclude<T, Falsy>

export const If = <T>(value: T): value is Truthy<T> => Boolean(value);
export const ElseIf = If;
export const Else = true;
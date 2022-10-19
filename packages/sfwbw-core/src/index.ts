export * from './types';
export * from './serialization';

export const PLAYER_NEUTRAL = 0;

// TODO - move somewhere
export function isEnum<Enum extends Record<string, any>>(theEnum: Enum, value: any): value is Enum[keyof Enum] {
  return Object.values(theEnum).includes(value);
}

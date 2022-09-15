import { ValidateIf } from 'class-validator';

// like IsOptional, but does not allow undefined
export const IsNullable = () => ValidateIf((_object, value) => value !== null);

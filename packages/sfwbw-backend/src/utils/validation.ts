import { registerDecorator, ValidationOptions } from 'class-validator';

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function Is2dArray(validationOptions: ValidationOptions = {}) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'is2dArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: '$property must be a 2d array',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.every(
              (row) =>
                Array.isArray(row) &&
                row.length === value[0].length &&
                row.every((cell) => !Array.isArray(cell)),
            )
          );
        },
      },
    });
  };
}

export function MatrixRows(
  min: number,
  max: number,
  validationOptions: ValidationOptions = {},
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'matrixRows',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: {
        message:
          '$property must have between $constraint1 and $constraint2 rows',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value?.length >= min && value?.length <= max;
        },
      },
    });
  };
}

export function MatrixColumns(
  min: number,
  max: number,
  validationOptions: ValidationOptions = {},
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'matrixColumns',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: {
        message:
          '$property must have between $constraint1 and $constraint2 columns',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value?.[0]?.length >= min && value?.[0]?.length <= max;
        },
      },
    });
  };
}

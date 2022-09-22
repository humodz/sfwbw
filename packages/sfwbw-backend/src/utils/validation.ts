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

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export interface Is2dArrayOptions {
  minRows?: number;
  maxRows?: number;
  minColumns?: number;
  maxColumns?: number;
}

export function Is2dArray(
  options: Is2dArrayOptions = {},
  validationOptions: ValidationOptions = {},
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'is2dArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: {
        message: '$property must be a 2d array',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const options: Is2dArrayOptions = args.constraints[0];

          return (
            Array.isArray(value) &&
            value.every(
              (row) =>
                Array.isArray(row) &&
                row.length === value[0].length &&
                row.every((cell) => !Array.isArray(cell)),
            ) &&
            (!isDefined(options.minRows) || value.length >= options.minRows) &&
            (!isDefined(options.maxRows) || value.length <= options.maxRows) &&
            (!isDefined(options.minColumns) ||
              value[0]?.length >= options.minColumns) &&
            (!isDefined(options.maxColumns) ||
              value[0]?.length <= options.maxColumns)
          );
        },
      },
    });
  };
}

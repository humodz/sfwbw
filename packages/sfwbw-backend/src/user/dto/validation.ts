import { applyDecorators } from '@nestjs/common';
import { IsString, Matches, MinLength } from 'class-validator';

export const IsUsername = () => {
  return applyDecorators(
    IsString(),
    MinLength(3),
    Matches(/^[-_.a-zA-Z0-9]+$/, {
      message:
        '$property can have only letters, numbers or the following: - _ .',
    }),
  );
};

export const IsPassword = () => applyDecorators(IsString(), MinLength(8));

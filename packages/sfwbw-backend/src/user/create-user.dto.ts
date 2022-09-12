import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  @MinLength(4)
  @Matches(/^[-_.a-zA-Z0-9]+$/, {
    message: '$property can have only letters, numbers or the following: - _ .',
  })
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string | null;
}

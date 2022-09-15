import { IsEmail } from 'class-validator';
import { IsNullable } from 'src/utils/validation';
import { IsPassword, IsUsername } from './validation';

export class CreateUserRequest {
  @IsUsername()
  username!: string;

  @IsPassword()
  password!: string;

  @IsEmail()
  @IsNullable()
  email!: string | null;
}

import { IsEmail, IsOptional } from 'class-validator';
import { IsPassword, IsUsername } from './validation';

export class CreateUserRequest {
  @IsUsername()
  username!: string;

  @IsPassword()
  password!: string;

  @IsEmail()
  @IsOptional()
  email: string | null = null;
}

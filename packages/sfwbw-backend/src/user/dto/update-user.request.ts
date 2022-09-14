import { IsEmail, IsOptional } from 'class-validator';
import { IsPassword } from './validation';

export class UpdateUserRequest {
  @IsPassword()
  @IsOptional()
  password!: string;

  @IsEmail()
  @IsOptional()
  email?: string | null;
}

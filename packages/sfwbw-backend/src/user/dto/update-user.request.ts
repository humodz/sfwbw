import { IsEmail, IsOptional } from 'class-validator';
import { IsPassword, IsUsername } from './validation';

export class UpdateUserRequest {
  @IsUsername()
  @IsOptional()
  username!: string;

  @IsPassword()
  @IsOptional()
  password!: string;

  @IsEmail()
  @IsOptional()
  email?: string | null;
}

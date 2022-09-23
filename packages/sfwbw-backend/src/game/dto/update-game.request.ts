import { IsInt, IsOptional } from 'class-validator';
import { IsGameName, IsGamePassword } from './validation';

export class UpdateGameRequest {
  @IsOptional()
  @IsGameName()
  name?: string | null;

  @IsOptional()
  @IsInt()
  designMapId?: number | null;

  @IsOptional()
  @IsGamePassword()
  password?: string | null;
}

import { IsInt } from 'class-validator';
import { IsGameName, IsGamePassword } from './validation';

export class CreateGameRequest {
  @IsGameName()
  name!: string;

  @IsInt()
  designMapId!: number;

  @IsGamePassword()
  password?: string | null;
}

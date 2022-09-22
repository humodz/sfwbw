import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGameRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name!: string;

  @IsInt()
  designMapId!: number;
}

import { IsNotEmpty, IsObject, IsString, MaxLength } from 'class-validator';

export class CreateGameRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name!: string;

  @IsObject()
  map!: any;
}

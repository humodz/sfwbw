import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateGameRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name!: string;

  @IsBoolean()
  isPrivate!: boolean;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @IsOptional()
  password: string | null = null;

  @IsObject()
  map!: any;

  @IsInt()
  @IsOptional()
  maxTurns: number | null = null;
}

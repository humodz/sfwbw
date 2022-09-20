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

export class UpdateGameRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name?: string | null;

  @IsBoolean()
  isPrivate?: boolean | null;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @IsOptional()
  password?: string | null;

  @IsObject()
  map?: any | null;

  @IsInt()
  @IsOptional()
  maxTurns?: number | null;
}

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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name?: string | null;

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  password?: string | null;

  @IsOptional()
  @IsObject()
  map?: any | null;

  @IsOptional()
  @IsInt()
  maxTurns?: number | null;
}

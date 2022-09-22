import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateGameRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name?: string | null;

  @IsOptional()
  @IsInt()
  designMapId?: number | null;
}

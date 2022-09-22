import { Nation } from '@sfwbw/sfwbw-core';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdatePlayerRequest {
  @IsBoolean()
  @IsOptional()
  ready!: boolean;

  @IsEnum(Nation)
  @IsOptional()
  nation!: Nation;
}

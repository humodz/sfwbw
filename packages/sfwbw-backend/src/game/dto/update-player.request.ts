import { Nation } from '@sfwbw/sfwbw-core';
import { IsBoolean, IsEnum, IsOptional, NotEquals } from 'class-validator';

export class UpdatePlayerRequest {
  @IsBoolean()
  @IsOptional()
  ready!: boolean;

  @IsEnum(Nation)
  @NotEquals(Nation.NEUTRAL)
  @IsOptional()
  nation!: Nation;
}

import { Unit, UnitType } from '@sfwbw/sfwbw-core';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, Max, Min } from 'class-validator';
import { IsPlayer } from './validation';

export class UnitDto implements Unit {
  @IsEnum(UnitType)
  type!: UnitType;

  @IsPlayer()
  player!: number;

  @Min(0)
  @Max(10)
  health!: number;

  @IsInt()
  @Min(0)
  fuel!: number;

  @IsInt()
  @Min(0)
  ammo!: number;

  @IsArray()
  @Type(() => UnitDto)
  loaded!: Unit[];
}

import { Unit, UnitType } from '@sfwbw/sfwbw-core';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { IsPlayer } from './validation';

export class UnitDto implements Unit {
  @Expose()
  @IsEnum(UnitType)
  type!: UnitType;

  @Expose()
  @IsPlayer()
  player!: number;

  // @Min(0)
  // @Max(10)
  // health!: number;

  // @IsInt()
  // @Min(0)
  // fuel!: number;

  // @IsInt()
  // @Min(0)
  // ammo!: number;

  // @IsArray()
  // @Type(() => UnitDto)
  // loaded!: Unit[];
}

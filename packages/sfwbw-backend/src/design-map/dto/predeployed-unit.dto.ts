import { Point, PredeployedUnit, UnitType } from '@sfwbw/sfwbw-core';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInt, IsObject, ValidateNested } from 'class-validator';
import { IsPlayer } from './validation';

export class PredeployedUnitDto implements PredeployedUnit {
  @Expose()
  @IsEnum(UnitType)
  type!: UnitType;

  @Expose()
  @IsPlayer()
  player!: number;

  @Type(() => PointDto)
  @ValidateNested()
  @IsObject()
  pos!: Point;
}

class PointDto {
  @IsInt()
  x!: number;

  @IsInt()
  y!: number;
}

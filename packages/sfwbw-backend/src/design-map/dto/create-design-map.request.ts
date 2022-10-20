import { deserializeTiles, Tile } from '@sfwbw/sfwbw-core';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Is2dArray, MatrixColumns, MatrixRows } from '../../utils';
import { TileDto } from './tile.dto';
import { PredeployedUnitDto } from './predeployed-unit.dto';
import { IsCoord } from './validation';

export class CreateDesignMapRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @Expose({ name: 'tiles' })
  @Transform(({ value }) =>
    typeof value === 'string' ? deserializeTiles(value) : value,
  )
  @Type(() => TileDto)
  @ValidateNested()
  @Is2dArray()
  @MatrixRows(5, 50)
  @MatrixColumns(5, 50)
  map!: Tile[][];

  // TODO improve validation
  @IsArray()
  @Type(() => UnitsDictItem)
  @ValidateNested()
  units!: UnitsDictItem[];
}

class UnitsDictItem {
  @IsCoord()
  key!: [number, number];

  @IsObject()
  @Type(() => PredeployedUnitDto)
  @ValidateNested()
  value!: PredeployedUnitDto;
}

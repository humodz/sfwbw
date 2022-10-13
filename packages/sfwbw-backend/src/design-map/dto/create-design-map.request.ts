import { Tile } from '@sfwbw/sfwbw-core';
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Is2dArray, MatrixColumns, MatrixRows } from '../../utils/validation';
import { TileDto } from './tile.dto';
import { IsValidTileData } from './validation';

export class CreateDesignMapRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @Expose({ name: 'tiles' })
  @Type(() => TileDto)
  @ValidateNested()
  @Is2dArray()
  @MatrixRows(5, 100)
  @MatrixColumns(5, 100)
  @IsValidTileData()
  map!: Tile[][];
}

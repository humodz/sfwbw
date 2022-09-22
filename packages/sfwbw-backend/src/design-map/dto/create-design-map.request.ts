import { Tile } from '@sfwbw/sfwbw-core';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Is2dArray } from '../../utils/validation';
import { TileDto } from './tile.dto';
import { IsValidTileData } from './validation';

export class CreateDesignMapRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @Type(() => TileDto)
  @ValidateNested()
  @Is2dArray({
    minRows: 5,
    maxRows: 50,
    minColumns: 5,
    maxColumns: 50,
  })
  @IsValidTileData()
  tiles!: Tile[][];
}
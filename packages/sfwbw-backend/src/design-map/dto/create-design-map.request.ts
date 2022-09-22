import { Tile } from '@sfwbw/sfwbw-core';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Is2dArray } from 'src/utils/validation';
import { TileDto } from './tile.dto';
import { IsValidTileData } from './validation';

export class CreateDesignMapRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @Type(() => TileDto)
  @ValidateNested()
  @Is2dArray()
  @IsValidTileData()
  tiles!: Tile[][];
}

import { Tile, TileType } from '@sfwbw/sfwbw-core';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

export class TileDto implements Tile {
  @IsEnum(TileType)
  type!: TileType;

  @IsInt()
  @Min(0)
  @Max(4)
  player!: number;
}

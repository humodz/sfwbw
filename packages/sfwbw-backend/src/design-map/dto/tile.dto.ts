import { Tile, TileType } from '@sfwbw/sfwbw-core';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

export class TileDto implements Tile {
  @IsEnum(TileType)
  @Expose()
  type!: TileType;

  @IsInt()
  @Min(0)
  @Max(4)
  @Expose()
  player!: number;
}

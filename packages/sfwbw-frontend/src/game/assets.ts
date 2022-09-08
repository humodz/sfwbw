import { isBuilding, isTerrain, Tile } from '@sfwbw/sfwbw-core';
import { tiles } from '@sfwbw/sfwbw-assets';

export function getTileImage(tile: Tile): string {
  if (isTerrain(tile.type)) {
    return tiles.terrain[tile.type];
  } else if (isBuilding(tile.type)) {
    return tiles.buildings[tile.nation][tile.type];
  }

  return '';
}
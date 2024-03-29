import {
  isBuilding,
  isTerrain,
  Nation,
  Tile,
  PredeployedUnit,
} from '@sfwbw/sfwbw-core';
import { tiles, units } from '@sfwbw/sfwbw-assets';

const defaultNationIndexes = [
  Nation.NEUTRAL,
  Nation.RED_STAR,
  Nation.BLUE_MOON,
  Nation.GREEN_EARTH,
  Nation.YELLOW_COMET,
];

export function getTileImage(
  tile: Tile,
  nations: Nation[] = defaultNationIndexes,
): string {
  if (isTerrain(tile.type)) {
    return tiles.terrain[tile.type];
  } else if (isBuilding(tile.type)) {
    return tiles.buildings[nations[tile.player]][tile.type];
  }

  return '';
}

export function getUnitImage(
  unit: Omit<PredeployedUnit, 'pos'>,
  nations: Nation[] = defaultNationIndexes,
) {
  return units[nations[unit.player]][unit.type];
}

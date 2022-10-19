export interface Tile {
  type: TileType;
  player: number;
  variation: number;
}

export enum Terrain {
  PLAINS = 'PLAINS',
  FOREST = 'FOREST',
  MOUNTAIN = 'MOUNTAIN',
  STRONGHOLD = 'STRONGHOLD',

  ROAD = 'ROAD',
  BRIDGE = 'BRIDGE',
  RAIL = 'RAIL',

  SEA = 'SEA',
  SHOAL = 'SHOAL',
  RIVER = 'RIVER',
}

export enum Building {
  CITY = 'CITY',
  HQ = 'HQ',
  BASE = 'BASE',
  AIRPORT = 'AIRPORT',
  PORT = 'PORT',
  STATION = 'STATION',
  LAB = 'LAB',
}

export type TileType = Terrain | Building;
export const TileType = {
  ...Terrain,
  ...Building,
} as const;

// TODO - replace with isEnum
const terrainValues = Object.values(Terrain);

export function isTerrain(type: string): type is Terrain {
  return terrainValues.includes(type as any);
}

const buildingValues = Object.values(Building);

export function isBuilding(type: string): type is Building {
  return buildingValues.includes(type as any);
}
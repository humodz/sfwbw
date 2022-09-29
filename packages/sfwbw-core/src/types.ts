
export interface Tile {
  type: TileType;
  player: number;
}

export const PLAYER_NEUTRAL = 0;

export enum Terrain {
  PLAINS = 'plains',
  FOREST = 'forest',
  MOUNTAIN = 'mountain',
  STRONGHOLD = 'stronghold',

  ROAD = 'road',
  BRIDGE = 'bridge',
  RAIL = 'rail',

  SEA = 'sea',
  SHOAL = 'shoal',
  RIVER = 'river',
}

export enum Building {
  CITY = 'city',
  HQ = 'hq',
  BASE = 'base',
  AIRPORT = 'airport',
  PORT = 'port',
  STATION = 'station',
  LAB = 'lab',
}

export type TileType = Terrain | Building;
export const TileType = {
  ...Terrain,
  ...Building,
};

export enum Nation {
  NEUTRAL = 'neutral',
  RED_STAR = 'red',
  BLUE_MOON = 'blue',
  GREEN_EARTH = 'green',
  YELLOW_COMET = 'yellow',
}

const terrainValues = Object.values(Terrain);

export function isTerrain(type: string): type is Terrain {
  return terrainValues.includes(type as any);
}

const buildingValues = Object.values(Building);

export function isBuilding(type: string): type is Building {
  return buildingValues.includes(type as any);
}


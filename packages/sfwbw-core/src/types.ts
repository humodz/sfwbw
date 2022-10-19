export interface Tile {
  type: TileType;
  player: number;
  variation: number;
}

export const PLAYER_NEUTRAL = 0;

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

export enum Nation {
  NEUTRAL = 'NEUTRAL',
  RED_STAR = 'RED_STAR',
  BLUE_MOON = 'BLUE_MOON',
  GREEN_EARTH = 'GREEN_EARTH',
  YELLOW_COMET = 'YELLOW_COMET',
}

// TODO - replace with isEnum
const terrainValues = Object.values(Terrain);

export function isTerrain(type: string): type is Terrain {
  return terrainValues.includes(type as any);
}

const buildingValues = Object.values(Building);

export function isBuilding(type: string): type is Building {
  return buildingValues.includes(type as any);
}

export interface Unit {
  type:  UnitType;
  player: number;
  health: number;
  fuel: number;
  ammo: number;
  loaded: Unit[];
}

export enum BaseUnit {
  INFANTRY = 'INFANTRY',
  MECH = 'MECH',
  LIGHT_TANK = 'LIGHT_TANK',
  MEDIUM_TANK = 'MEDIUM_TANK',
  HEAVY_TANK = 'HEAVY_TANK',
  PROTOTYPE_TANK = 'PROTOTYPE_TANK',
  ARTILLERY = 'ARTILLERY',
  ROCKET = 'ROCKET',
  TRAIN = 'TRAIN',
  FLAK = 'FLAK',
  MISSILE = 'MISSILE',
  RECON = 'RECON',
  ANTI_AIR = 'ANTI_AIR',
  APC = 'APC',
  TRUCK = 'TRUCK',
}

export enum AirportUnit {
  FIGHTER = 'FIGHTER',
  BOMBER = 'BOMBER',
  PLANE = 'PLANE',
  B_COPTER = 'B_COPTER',
  T_COPTER = 'T_COPTER',
}

export enum PortUnit {
  BATTLESHIP = 'BATTLESHIP',
  CRUISER = 'CRUISER',
  LANDER = 'LANDER',
  SUBMARINE = 'SUBMARINE',
}

export type UnitType = BaseUnit | AirportUnit | PortUnit | 'PROTOTYPE_TANK';

export const UnitType = {
  ...BaseUnit,
  ...AirportUnit,
  ...PortUnit,
  PROTOTYPE_TANK: 'PROTOTYPE_TANK',
} as const;



// TODO - move somewhere
export function isEnum<Enum extends Record<string, any>>(theEnum: Enum, value: any): value is Enum[keyof Enum] {
  return Object.values(theEnum).includes(value);
}

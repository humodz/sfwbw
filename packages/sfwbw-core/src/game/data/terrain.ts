import { TileType } from '../../types';

export enum MovementType {
  BOOT = 'BOOT',
  TIRE = 'TIRE',
  TREAD = 'TREAD',
  SHIP = 'SHIP',
  TRAIN = 'TRAIN',
  AIR = 'AIR',
}

export const defenseStars: Record<TileType, number> = {
  PLAINS: 1,
  FOREST: 2,
  MOUNTAIN: 4,
  STRONGHOLD: 5,
  ROAD: 0,
  BRIDGE: 0,
  RAIL: 0,
  SEA: 0,
  SHOAL: 0,
  RIVER: 0,
  CITY: 3,
  HQ: 4,
  BASE: 3,
  AIRPORT: 3,
  PORT: 3,
  STATION: 3,
  LAB: 3,
};

const buildingMovementCost = {
  CITY: 1,
  HQ: 1,
  BASE: 1,
  AIRPORT: 1,
  PORT: 1,
  STATION: 1,
  LAB: 1,
};

export const movementCost: Record<
  MovementType,
  Partial<Record<TileType, number>>
> = {
  BOOT: {
    ...buildingMovementCost,
    PLAINS: 1,
    FOREST: 1,
    MOUNTAIN: 2,
    STRONGHOLD: 1,

    ROAD: 1,
    BRIDGE: 1,
    RAIL: 1,

    SHOAL: 4,
    RIVER: 2,
  },
  TIRE: {
    ...buildingMovementCost,
    PLAINS: 2,
    STRONGHOLD: 1,

    ROAD: 1,
    BRIDGE: 1,
    RAIL: 4,

    SHOAL: 1,
  },
  TREAD: {
    ...buildingMovementCost,
    PLAINS: 1,
    STRONGHOLD: 1,

    ROAD: 1,
    BRIDGE: 1,
    RAIL: 2,

    SHOAL: 1,
  },
  SHIP: {
    PORT: 1,
    SHOAL: 1,
    SEA: 1,
  },
  TRAIN: {
    STATION: 1,
    RAIL: 1,
  },
  AIR: {
    ...buildingMovementCost,
    PLAINS: 1,
    FOREST: 1,
    MOUNTAIN: 1,
    STRONGHOLD: 1,

    ROAD: 1,
    BRIDGE: 1,
    RAIL: 1,

    SEA: 1,
    SHOAL: 1,
    RIVER: 1,
  },
};

import { Building, TileType, UnitType } from '../../types';
import { MovementType } from './terrain';
import { UnitWeapon } from './weapons';

export interface UnitData {
  cost: number;
  vision: number;
  move: number;
  ammo: number;
  fuel: number;
  fuelPerDay: number;
  factory: UnitFactory;
  movementType: MovementType;
  transportType: TransportType;
  canSupply: boolean;
  canTransport?: {
    capacity: number;
    types: TransportType[];
    canLoadAt: TileType[];
  };
  weapons: UnitWeapon[];
}

export enum TransportType {
  INFANTRY = 'INFANTRY',
  VEHICLE = 'VEHICLE',
  COPTER = 'COPTER',
  NONE = 'NONE',
}

export enum UnitFactory {
  BASE_OR_HQ = 'BASE_OR_HQ',
  PORT = 'PORT',
  AIRPORT = 'AIRPORT',
  LAB = 'LAB',
  STATION = 'STATION',
}

export const unitData: Record<UnitType, UnitData> = {
  INFANTRY: {
    cost: 1000,
    vision: 2,
    move: 3,
    ammo: 0,
    fuel: 99,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.BOOT,
    transportType: TransportType.INFANTRY,
    canSupply: false,
    weapons: [],
  },
  MECH: {
    cost: 3000,
    vision: 2,
    move: 2,
    ammo: 3,
    fuel: 70,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.BOOT,
    transportType: TransportType.INFANTRY,
    canSupply: false,
    weapons: [],
  },
  LIGHT_TANK: {
    cost: 6000,
    vision: 3,
    move: 6,
    ammo: 12,
    fuel: 70,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  MEDIUM_TANK: {
    cost: 12000,
    vision: 2,
    move: 5,
    ammo: 10,
    fuel: 60,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  HEAVY_TANK: {
    cost: 18000,
    vision: 1,
    move: 4,
    ammo: 8,
    fuel: 50,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  PROTOTYPE_TANK: {
    cost: 0,
    vision: 2,
    move: 6,
    ammo: 12,
    fuel: 80,
    fuelPerDay: 0,
    factory: UnitFactory.LAB,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ARTILLERY: {
    cost: 7000,
    vision: 1,
    move: 4,
    ammo: 10,
    fuel: 50,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ROCKET: {
    cost: 15000,
    vision: 1,
    move: 4,
    ammo: 6,
    fuel: 50,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  TRAIN: {
    cost: 30000,
    vision: 1,
    move: 15,
    ammo: 16,
    fuel: 99,
    fuelPerDay: 0,
    factory: UnitFactory.STATION,
    movementType: MovementType.TRAIN,
    transportType: TransportType.NONE,
    canSupply: false,
    canTransport: {
      capacity: 2,
      types: [TransportType.INFANTRY, TransportType.VEHICLE],
      canLoadAt: [TileType.STATION],
    },
    weapons: [],
  },
  FLAK: {
    cost: 6500,
    vision: 1,
    move: 4,
    ammo: 10,
    fuel: 50,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  MISSILE: {
    cost: 13000,
    vision: 1,
    move: 4,
    ammo: 6,
    fuel: 50,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  RECON: {
    cost: 3500,
    vision: 5,
    move: 8,
    ammo: 0,
    fuel: 80,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ANTI_AIR: {
    cost: 8000,
    vision: 2,
    move: 6,
    ammo: 14,
    fuel: 60,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  APC: {
    cost: 5000,
    vision: 1,
    move: 6,
    ammo: 0,
    fuel: 70,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.INFANTRY],
      canLoadAt: Object.values(TileType),
    },
    weapons: [],
  },
  TRUCK: {
    cost: 4000,
    vision: 1,
    move: 8,
    ammo: 0,
    fuel: 60,
    fuelPerDay: 0,
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: true,
    weapons: [],
  },
  FIGHTER: {
    cost: 20000,
    vision: 2,
    move: 9,
    ammo: 10,
    fuel: 99,
    fuelPerDay: 5,
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
  BOMBER: {
    cost: 22000,
    vision: 1,
    move: 7,
    ammo: 16,
    fuel: 99,
    fuelPerDay: 5,
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
  PLANE: {
    cost: 26000,
    vision: 1,
    move: 8,
    ammo: 6,
    fuel: 99,
    fuelPerDay: 5,
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
  B_COPTER: {
    cost: 8500,
    vision: 3,
    move: 6,
    ammo: 6,
    fuel: 80,
    fuelPerDay: 2,
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
  T_COPTER: {
    cost: 5500,
    vision: 2,
    move: 6,
    ammo: 0,
    fuel: 80,
    fuelPerDay: 2,
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: TransportType.NONE,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.INFANTRY],
      // TODO - check bridge, rail, shoal
      canLoadAt: [...Object.values(Building), TileType.PLAINS, TileType.ROAD],
    },
    weapons: [],
  },
  BATTLESHIP: {
    cost: 35000,
    vision: 3,
    move: 5,
    ammo: 18,
    fuel: 99,
    fuelPerDay: 1,
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
  CRUISER: {
    cost: 22000,
    vision: 5,
    move: 6,
    ammo: 10,
    fuel: 99,
    fuelPerDay: 1,
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: TransportType.NONE,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.COPTER],
      canLoadAt: Object.values(TileType),
    },
    weapons: [],
  },
  LANDER: {
    cost: 16500,
    vision: 1,
    move: 5,
    ammo: 0,
    fuel: 99,
    fuelPerDay: 1,
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: TransportType.NONE,
    canSupply: false,
    canTransport: {
      capacity: 2,
      types: [TransportType.INFANTRY, TransportType.VEHICLE],
      canLoadAt: [TileType.PORT, TileType.SHOAL],
    },
    weapons: [],
  },
  SUBMARINE: {
    cost: 24000,
    vision: 3,
    move: 4,
    ammo: 6,
    fuel: 99,
    fuelPerDay: 1,
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: TransportType.NONE,
    canSupply: false,
    weapons: [],
  },
};

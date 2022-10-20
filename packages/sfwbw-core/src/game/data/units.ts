import { UnitType } from '../../types';
import { MovementType } from './terrain';
import { UnitWeapon } from './weapons';

export interface UnitData {
  factory: UnitFactory;
  movementType: MovementType;
  transportType: TransportType | null;
  canSupply: boolean;
  canTransport?: {
    capacity: number;
    types: TransportType[];
  };
  weapons: UnitWeapon[];
}

export enum TransportType {
  INFANTRY = 'INFANTRY',
  VEHICLE = 'VEHICLE',
  COPTER = 'COPTER',
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
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.BOOT,
    transportType: TransportType.INFANTRY,
    canSupply: false,
    weapons: [],
  },
  MECH: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.BOOT,
    transportType: TransportType.INFANTRY,
    canSupply: false,
    weapons: [],
  },
  LIGHT_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  MEDIUM_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  HEAVY_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  PROTOTYPE_TANK: {
    factory: UnitFactory.LAB,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ARTILLERY: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ROCKET: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  TRAIN: {
    factory: UnitFactory.STATION,
    movementType: MovementType.TRAIN,
    transportType: null,
    canSupply: false,
    canTransport: {
      capacity: 2,
      types: [TransportType.INFANTRY, TransportType.VEHICLE],
    },
    weapons: [],
  },
  FLAK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  MISSILE: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  RECON: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  ANTI_AIR: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    weapons: [],
  },
  APC: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    transportType: TransportType.VEHICLE,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.INFANTRY],
    },
    weapons: [],
  },
  TRUCK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    transportType: TransportType.VEHICLE,
    canSupply: true,
    weapons: [],
  },
  FIGHTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
  BOMBER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
  PLANE: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
  B_COPTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
  T_COPTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    transportType: null,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.INFANTRY],
    },
    weapons: [],
  },
  BATTLESHIP: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
  CRUISER: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: null,
    canSupply: false,
    canTransport: {
      capacity: 1,
      types: [TransportType.COPTER],
    },
    weapons: [],
  },
  LANDER: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: null,
    canSupply: false,
    canTransport: {
      capacity: 2,
      types: [TransportType.INFANTRY, TransportType.VEHICLE],
    },
    weapons: [],
  },
  SUBMARINE: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    transportType: null,
    canSupply: false,
    weapons: [],
  },
};

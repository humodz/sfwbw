import { UnitType } from '../../types';
import { MovementType } from './terrain';
import { UnitWeapon } from './weapons';

interface UnitData {
  factory: UnitFactory;
  movementType: MovementType;
  weapons: UnitWeapon[];
}

enum UnitFactory {
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
    weapons: [],
  },
  MECH: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.BOOT,
    weapons: [],
  },
  LIGHT_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  MEDIUM_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  HEAVY_TANK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  PROTOTYPE_TANK: {
    factory: UnitFactory.LAB,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  ARTILLERY: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  ROCKET: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    weapons: [],
  },
  TRAIN: {
    factory: UnitFactory.STATION,
    movementType: MovementType.TRAIN,
    weapons: [],
  },
  FLAK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  MISSILE: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    weapons: [],
  },
  RECON: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    weapons: [],
  },
  ANTI_AIR: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  APC: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TREAD,
    weapons: [],
  },
  TRUCK: {
    factory: UnitFactory.BASE_OR_HQ,
    movementType: MovementType.TIRE,
    weapons: [],
  },
  FIGHTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    weapons: [],
  },
  BOMBER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    weapons: [],
  },
  PLANE: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    weapons: [],
  },
  B_COPTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    weapons: [],
  },
  T_COPTER: {
    factory: UnitFactory.AIRPORT,
    movementType: MovementType.AIR,
    weapons: [],
  },
  BATTLESHIP: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    weapons: [],
  },
  CRUISER: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    weapons: [],
  },
  LANDER: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    weapons: [],
  },
  SUBMARINE: {
    factory: UnitFactory.PORT,
    movementType: MovementType.SHIP,
    weapons: [],
  },
};

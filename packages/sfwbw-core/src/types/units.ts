import { Point } from './point';

export interface PredeployedUnit {
  type: UnitType;
  player: number;
  pos: Point;
}
export interface Unit extends PredeployedUnit {
  moved: boolean;
  health: number;
  fuel: number;
  ammo: number;
  experience: number;
  captureProgress: number;
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

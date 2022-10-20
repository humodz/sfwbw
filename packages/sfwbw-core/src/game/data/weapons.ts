import { UnitType } from '../../types';

export type UnitWeapon =
  | { type: WeaponType.PRIMARY | WeaponType.SECONDARY; damage: DamageTable }
  | {
      type: WeaponType.RANGED;
      minRange: number;
      maxRange: number;
      damage: DamageTable;
    };

export enum WeaponType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  RANGED = 'RANGED',
}

export type DamageTable = Partial<Record<UnitType, number>>;

export const weapons = {};

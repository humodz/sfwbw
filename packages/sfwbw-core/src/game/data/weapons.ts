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

type WeaponsTable = Partial<Record<UnitType, Record<string, UnitWeapon>>>;

export const weapons: WeaponsTable = {};

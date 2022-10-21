import {
  GameSettings,
  UnitType,
  Point,
  Unit,
  Game,
  pointEquals,
} from '../types';
import { unitData } from './data/units';

export function createUnit(
  settings: GameSettings,
  type: UnitType,
  player: number,
  where: Point,
): Unit {
  const data = unitData[type];

  return {
    type,
    player,
    pos: where,

    loaded: [],
    moved: true,
    health: settings.totalHealth,
    fuel: data.fuel,
    ammo: data.ammo,
    experience: 0,
    captureProgress: 0,
  };
}

export function isVacant(game: Game, where: Point) {
  return !game.units.some((unit) => pointEquals(unit.pos, where));
}

export function calculateRepair(settings: GameSettings, unit: Unit) {
  const repair = Math.min(
    settings.repairAmount,
    settings.totalHealth - unit.health,
  );

  const repairCost = Math.floor((unitData[unit.type].cost * repair) / 100);

  return { repair, repairCost };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function calculateResupplyCost(unit: Unit) {
  // TODO
  return 0;
}

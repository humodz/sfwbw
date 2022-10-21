import { UnitType, Point, Unit, Game, pointEquals } from '../../types';
import { unitData } from '../data/units';

// TODO - remove duplication (game.ts)
const constants = {
  totalHealth: 100,
};

export function createUnit(type: UnitType, player: number, where: Point): Unit {
  const data = unitData[type];

  return {
    type,
    player,
    pos: where,

    loaded: [],
    moved: true,
    health: constants.totalHealth,
    fuel: data.fuel,
    ammo: data.ammo,
    experience: 0,
    captureProgress: 0,
  };
}

export function isCurrentPlayer(game: Game, playerId: number) {
  const currentPlayer = game.players[game.currentPlayerIndex];
  return currentPlayer.id !== playerId;
}

export function isVacant(game: Game, where: Point) {
  return !game.units.some((unit) => pointEquals(unit.pos, where));
}

export class InvalidAction extends Error {
  constructor(message = 'Invalid Action') {
    super(message);
    this.name = 'InvalidAction';
    Error.captureStackTrace(this, this.constructor);
  }

  static throwIf(conditions: Record<string, unknown>) {
    for (const [message, shouldThrow] of Object.entries(conditions)) {
      if (shouldThrow) {
        throw new InvalidAction(message);
      }
    }
  }
}

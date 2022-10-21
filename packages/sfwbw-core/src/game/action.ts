import produce from 'immer';
import {
  Game,
  Action,
  ActionRecruit,
  ActionType,
  Point,
  pointEquals,
  UnitType,
  Unit,
} from '../types';
import { unitData } from './data/units';
import { getAvailableUnits, isFactory } from './factories';

// TODO - remove duplication (game.ts)
const constants = {
  totalHealth: 100,
};

export function executeAction(game: Game, action: Action): Game {
  const handlers: Record<ActionType, ActionHandler> = {
    [ActionType.RECRUIT]: executeActionRecruit,
    [ActionType.RANGED_ATTACK]: (game) => game,
    [ActionType.MOVE]: (game) => game,
    [ActionType.IDLE]: (game) => game,
  };

  return handlers[action.type](game, action);
}

type ActionHandler = (game: Game, action: Action) => Game;

// TODO - unit limit
export function executeActionRecruit(game: Game, action: ActionRecruit) {
  return produce(game, (game) => {
    const player = game.players[game.currentPlayerIndex];
    const tile = game.tiles[action.where.y][action.where.x];

    if (
      !isCurrentPlayer(game, tile.player) ||
      !isVacant(game, action.where) ||
      !isFactory(tile.type) ||
      !getAvailableUnits(player, tile.type).includes(action.unit)
    ) {
      throw new InvalidAction();
    }

    game.units.push(createUnit(action.unit, player.id, action.where));
    player.funds -= unitData[action.unit].cost;
  });
}

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

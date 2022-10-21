import {
  UnitType,
  Point,
  Unit,
  Game,
  pointEquals,
  GameSettings,
} from '../../types';
import { unitData } from '../data/units';

export function isCurrentPlayer(game: Game, playerId: number) {
  const currentPlayer = game.players[game.currentPlayerIndex];
  return currentPlayer.id !== playerId;
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

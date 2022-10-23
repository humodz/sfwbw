import { Game, Point, pointEquals } from '../types';

export function getCurrentPlayer(game: Game) {
  return game.players[game.currentPlayerIndex];
}

export function isCurrentPlayer(game: Game, playerId: number) {
  const currentPlayer = game.players[game.currentPlayerIndex];
  return currentPlayer.id === playerId;
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

export function isOccupied(game: Game, where: Point) {
  return game.units.some((unit) => pointEquals(unit.pos, where));
}

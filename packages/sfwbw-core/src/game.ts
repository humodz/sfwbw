import { Action, Coord } from './types/action';
import { Tile } from './types/tiles';
import { PredeployedUnit, Unit } from './types/units';

export interface Game {
  tiles: Tile[][];
  units: Array<[Coord, Unit]>;
  history: Action[];
  currentPlayer: number;
  players: { defeated: boolean }[];
  rng: unknown;
}

export function createGame(
  tiles: Tile[][],
  units: Array<[Coord, PredeployedUnit]>,
): Game {
  return {
    tiles: [],
    units: [],
    history: [],
    currentPlayer: 0,
    players: [],
    rng: 'TODO',
  };
}

export function executeAction(game: Game, action: Action): Game {
  return game;
}

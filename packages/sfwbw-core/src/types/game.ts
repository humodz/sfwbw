import { Coord, Action } from './action';
import { Tile } from './tiles';
import { Unit } from './units';

export interface Game {
  tiles: Tile[][];
  units: Array<[Coord, Unit]>;
  history: Action[];
  currentPlayer: number;
  players: GamePlayer[];
  rng: unknown;
}

export interface GamePlayer {
  funds: number;
  defeated: boolean;
}

import { Action } from './action';
import { Tile } from './tiles';
import { Unit } from './units';

export interface Game {
  settings: GameSettings;
  tiles: Tile[][];
  units: Unit[];
  history: GameDay[];
  currentPlayerIndex: number;
  players: GamePlayer[];
  rng: unknown;
}

export interface GameSettings {
  fundsPerProperty: number;
}

export interface GamePlayer {
  id: number;
  funds: number;
  defeated: boolean;
}

export interface GameDay {
  player: number;
  actions: Action[];
}

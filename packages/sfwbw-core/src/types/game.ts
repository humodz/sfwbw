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
  totalHealth: number;
  repairAmount: number;
  unitLimit: number;
  fundsPerProperty: number;
}

export interface GamePlayer {
  id: number;
  funds: number;
  defeated: boolean;
}

export interface GameDay {
  playerIndex: number;
  actions: Action[];
}

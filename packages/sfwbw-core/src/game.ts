import { Action } from './types/action';
import { Tile } from './types/tiles';
import { Unit } from './types/units';

export interface Game {
  tiles: Tile[][];
  units: Unit;
  history: Action[];
}

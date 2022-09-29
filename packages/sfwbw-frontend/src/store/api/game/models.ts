import { deserializeTiles, Nation, Tile } from '@sfwbw/sfwbw-core';
import { User } from '../user/models';

export interface Game {
  id: number;
  name: string;
  hasPassword: string;
  status: string; // TODO
  designMap: DesignMap;
  owner: User;
  players: Player[];
}

export interface DesignMap {
  name: string;
  maxPlayers: number;
  tiles: Tile[][];
}

export interface RawGame extends Omit<Game, 'designMap'> {
  designMap: Omit<DesignMap, 'tiles'> & {
    tiles: string;
  };
}

export interface Player {
  user: User;
  nation: Nation;
  ready: boolean;
}

export function deserializeGame(rawGame: RawGame): Game {
  const tiles = deserializeTiles(rawGame.designMap.tiles);

  const designMap = {
    ...rawGame.designMap,
    tiles,
  };

  return {
    ...rawGame,
    designMap,
  };
}

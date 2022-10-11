import { Nation } from '@sfwbw/sfwbw-core';
import { deserializeDesignMap, DesignMap, RawDesignMap } from '../design-map';
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

export interface RawGame extends Omit<Game, 'designMap'> {
  designMap: RawDesignMap;
}

export interface Player {
  user: User;
  nation: Nation;
  ready: boolean;
}

export function deserializeGame(rawGame: RawGame): Game {
  return {
    ...rawGame,
    designMap: deserializeDesignMap(rawGame.designMap),
  };
}

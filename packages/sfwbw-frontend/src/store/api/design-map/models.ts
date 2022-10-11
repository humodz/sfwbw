import { deserializeTiles, Tile } from '@sfwbw/sfwbw-core';
import { User } from '../user';

export interface DesignMap {
  id: number;
  author: User;
  name: string;
  maxPlayers: number;
  rows: number;
  columns: number;
  tiles: Tile[][];
}

export interface RawDesignMap extends Omit<DesignMap, 'tiles'> {
  tiles: string;
}

export function deserializeDesignMap(rawDesignMap: RawDesignMap) {
  return {
    ...rawDesignMap,
    tiles: deserializeTiles(rawDesignMap.tiles),
  };
}

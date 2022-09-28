import { Nation, Tile } from '@sfwbw/sfwbw-core';

export interface User {
  username: string;
}
export interface UserSelf {
  username: string;
  email: string | null;
}

export interface Session {
  accessToken: string;
}

export interface Game {
  id: number;
  name: string;
  hasPassword: string;
  status: string; // TODO
  designMap: DesignMap; // TODO
  owner: User;
  players: Player[];
}

export interface DesignMap {
  name: string;
  maxPlayers: number;
  tiles: Tile[][];
}

export interface Player {
  user: User;
  nation: Nation;
  ready: boolean;
}

import { Nation } from '@sfwbw/sfwbw-core';

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
  isPrivate: boolean;
  password: string | null;
  status: string; // TODO
  designMap: DesignMap; // TODO
  maxTurns: number | null;
  owner: User;
  players: Player[];
}

export interface DesignMap {
  name: string;
  maxPlayers: number;
}

export interface Player {
  user: User;
  nation: Nation;
  ready: boolean;
}

import { Nation } from '@sfwbw/sfwbw-core';

export interface SearchGamesRequest {
  search?: string;
  player?: string;
  turn?: string;
}
export interface JoinGameRequest {
  gameId: number;
  password: string | null;
}

export interface UpdatePlayerRequest {
  gameId: number;
  nation?: Nation | null;
  ready?: boolean | null;
}

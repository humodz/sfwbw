import { Nation } from '@sfwbw/sfwbw-core';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string | null;
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

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
  map: any; // TODO
  maxTurns: number | null;
  owner: User;
  players: Player[];
}

export interface Player {
  user: User;
  ready: boolean;
}
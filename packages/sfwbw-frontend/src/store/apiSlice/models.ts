export interface User {
  username: string;
  email: string | null;
}

export interface Session {
  accessToken: string;
}
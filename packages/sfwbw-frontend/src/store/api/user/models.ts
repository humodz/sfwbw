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

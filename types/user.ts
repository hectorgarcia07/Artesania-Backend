export interface User {
  username: string;
  passwordHash: string;
  role: Role;
}

export interface UserRequest{
  username: string;
  password: string;
}

export enum Role {
  ADMIN = 'admin',
  NORMAL = 'normal'
}
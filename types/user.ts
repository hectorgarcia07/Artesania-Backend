interface User {
  username: string;
  passwordHash: string;
}

export interface UserRequest {
  username: string;
  password: string;
}

export default User;
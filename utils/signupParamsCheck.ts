import { isString } from './checkDataType';
import {User, Role} from '../types/user';

export const userCredentialParams = (obj:any):User => {
  return {
    username: isUsername(obj.username),
    passwordHash: isPassword(obj.password),
    role: isRole(obj.role)
  };
};

const isUsername = (username:unknown):string => {
  if(!username || !isString(username)){
    throw new Error("Username must be provided and has to be a string");
  }

  return username;
};

const isPassword = (password:unknown):string => {
  if(!password || !isString(password)){
    throw new Error("Username must be provided and has to be a string");
  }

  return password;
};

const isRole = (role:unknown):Role => {
  if(!role || !isString(role) || !checkEnumRole(role)){
    throw new Error("Must be a valid role");
  }
  return role;
};

const checkEnumRole = (role:string):role is Role => {
  return Object.values<string>(Role).includes(role);
};
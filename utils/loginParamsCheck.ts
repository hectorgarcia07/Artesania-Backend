import {UserRequest} from '../types/user';
import { isString } from './checkDataType';

export const loginUserCredentials = (obj:any):UserRequest => {
  return {
    username: isUsername(obj.username),
    password: isPassword(obj.password)
  };
};

const isUsername = (username:unknown):string => {
  if(!username || !isString(username)){
    throw new Error('Error: Username must be provided or a string');
  }
  return username;
};

const isPassword = (password:unknown):string => {
  if(!password || !isString(password)){
    throw new Error('Error: Password must provided or a string');
  }
  return password;
};

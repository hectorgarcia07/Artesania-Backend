import { TokenUser } from "../types/user";
import { isString } from './checkDataType'
import { Role} from '../types/user';


export const isUserToken = (obj:any):TokenUser => {
  return {
    username: isUsername(obj.username),
    id: isId(obj.id),
    role: isRole(obj.role)
  };
};

const isUsername = (username:unknown):string => {
  if(!username || !isString(username)){
    throw new Error("Username must be provided and has to be a string");
  }

  return username;
};

const isId = (password:unknown):string => {
  if(!password || !isString(password)){
    throw new Error('Error: Password must provided or a string');
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
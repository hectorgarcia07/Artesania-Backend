import User from "../models/user";
import { UserRequest } from '../types/user';
import bcrypt from "bcrypt";
import config from '../utils/config'
import jwt from 'jsonwebtoken'
import {Role, TokenUser} from '../types/user'
import { Request, Response, NextFunction } from 'express'
import { isUserToken } from '../utils/checkUserToken'


export const authenticateUser = async (userParams:UserRequest) => {
  const user = await User.findOne({username: userParams.username});
  
  const isAuthenticated = user && await bcrypt.compare( userParams.password, user.passwordHash)

  if(!isAuthenticated){
    return undefined
  }

  //signing token with user id
  const token = jwt.sign({
    id: user.id,
    role: user.role
  }, config.SECRET!, {
    expiresIn: 60*60
  });
  
  return {
    user,
    token
  }
}

export const checkRole = (role:Role) => (req:Request, res:Response, next:NextFunction) => {
  const user:TokenUser = isUserToken(req.user)
  if(!user || !user.role || role != user.role){
    return res.status(401).json({error: 'Unauthorized: Only admins can access this', success: false})
  }
  return next()
}
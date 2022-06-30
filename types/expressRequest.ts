import { Request } from 'express';
import { TokenUser } from '../types/user'

export interface CustomRequest extends Request {
  user: TokenUser;
}
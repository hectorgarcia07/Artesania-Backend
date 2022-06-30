import { TokenUser } from '../../types/user'
import { Request } from 'express'

declare namespace Express {
  interface Request {
    user?: TokenUser
  }
}
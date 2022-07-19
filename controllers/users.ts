import bcrypt from "bcrypt";
import express from "express";
import User from '../models/user';
import { userCredentialParams } from '../utils/signupParamsCheck';
import { loginUserCredentials } from '../utils/loginParamsCheck';
import { authenticateUser } from '../services/userServices'
import logger from '../utils/loggers'

const usersRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
usersRouter.post('/signup', async (req, res) => {
  const userParams = userCredentialParams(req.body);
  userParams.passwordHash = await bcrypt.hash(userParams.passwordHash, 8);
  const user = new User(userParams);
  const newUser = await user.save();

  res.status(200).json({success: "Register successfully", newUser});
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post('/signin', async (req, res) => {
  logger.info("SIGING IN")

  const userParams = loginUserCredentials(req.body);
  const user = await authenticateUser(userParams)

  if(!user){
    return res.status(401).json({ message: "Invalid username or password", success: false})
  }
  console.log("SUCESS", user)
  return res.status(200).json({...user, message: "Login successfull", success: true})
});

export default usersRouter;
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dotenv from "dotenv";
import express from "express";
import User from '../models/user';
import { userCredentialParams } from '../utils/signupParamsCheck';
import { loginUserCredentials } from '../utils/loginParamsCheck';

dotenv.config();
const usersRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
usersRouter.post('/signup', passport.authenticate('jwt',{session: false}), async (req, res) => {
  const userParams = userCredentialParams(req.body);
  userParams.passwordHash = await bcrypt.hash(userParams.passwordHash, 8);
  const user = new User(userParams);
  const newUser = await user.save();

  res.status(200).json({success: "Register successfully", newUser});
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post('/login', async (req, res) => {
  const userParams = loginUserCredentials(req.body);
  const user = await User.findOne({username: userParams.username});
  if(!user || user == null){
    return res.status(404).json({error: "User or password is invalid"});
  }
  const passwordIsValid = await bcrypt.compare( userParams.password, user.passwordHash);
  if(!passwordIsValid){
    return res.status(401).json({error: "User or password is invalid"});
  }

  //signing token with user id
  const token = jwt.sign({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: user.id
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  }, process.env.SECRET!, {
    expiresIn: 60*60
  });

  return res.status(200).json({token, message: "Login successfull"});
});

export default usersRouter;
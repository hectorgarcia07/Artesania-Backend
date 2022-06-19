import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import dotenv from "dotenv";
import { loginParamsCheck } from '../utils/loginParamsCheck';
dotenv.config();

const loginRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
loginRouter.post('/', async (request, response) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { username, password } = loginParamsCheck(request.body);

    const user = await User.findOne({ username });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const passwordCorrect = user === null
      ? false
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) 
      return response.status(401).json({
        error: 'invalid username or password'
      });
    }

    const userForToken = {
      username: user.username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: user.id,
    };

    const SECRET = process.env.SECRET;
    const token = jwt.sign(userForToken, SECRET as string);

    return response
      .status(200)
      .send({ token, username: user.username });
  }catch(err: unknown){
    if(err instanceof Error){
      return response.status(401).json({error: err.message});
    }
    return response.status(401).json({error: "Erron in signing in."});
  }
  
});

export default loginRouter;
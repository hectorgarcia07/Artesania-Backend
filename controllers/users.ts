import bcrypt from "bcrypt";
import express from "express";
import User from '../models/user';
import { loginParamsCheck } from '../utils/loginParamsCheck';

const usersRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
usersRouter.post('/', async (request, response) => {
  try{
    const { username, password } = loginParamsCheck(request.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {    
      return response.status(400).json({      
        error: 'username must be unique'    
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  }catch(err: unknown){
    if(err instanceof Error){
      return response.status(401).json({error: err.message});
    }
    return response.status(401).json({error: "Error couldn't create user."});
  }
});

export default usersRouter;
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user';
import dotenv from "dotenv";
import { TokenUser } from '../types/user'

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
passport.use(new JWTStrategy( 
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  }, 
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  function (jwtPayload, done){
    return User.findById(jwtPayload.id)
      .then(user => {
        console.log("FOUND, ", user)
        const userObj:TokenUser = JSON.parse(JSON.stringify(user))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return done(null, userObj);
      })
      .catch(err => {
        console.log(err)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return done(err);
      });
  }
));
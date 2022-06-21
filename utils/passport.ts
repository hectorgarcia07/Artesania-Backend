/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user';
import dotenv from "dotenv";

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
passport.use(new JWTStrategy( 
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  }, 
  function (jwtPayload, done){
    return User.findById(jwtPayload.id)
      .then(user => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return done(null, user);
      })
      .catch(err => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return done(err);
      });
  }
));
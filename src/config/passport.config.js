import passport from 'passport';
import locale from 'passport-local';
import passportjwt from 'passport-jwt';
import { checkPass } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import envsConfig from './envs.config.js';
import userServices from '../services/user.services.js';
import cartServices from '../services/cart.services.js';

const PassportLocale = locale.Strategy;
const PassportJWT = passportjwt.Strategy;
const ExtractJWT = passportjwt.ExtractJwt;

export const initializePassport = () => {
  passport.use(
    'register',
    new PassportLocale(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          const userExist = await userServices.findUser({ email: username });
          if (userExist) return done(null, false);
          const newCart = await cartServices.newCart();
          const newUser = userServices.createUser(first_name, last_name, age, username, password, newCart._id);
          const userCreated = await userServices.addUserToDB(newUser);
          return done(null, userCreated);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    'login',
    new PassportLocale({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const userExist = await userServices.findUser({ email: username });
        if (!userExist || !checkPass(userExist.password, password)) {
          return done(null, false);
        }
        return done(null, userExist);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    'jwt',
    new PassportJWT(
      { jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envsConfig.JWT_SECRETCODE },
      async (jwt_payload, done) => {
        try {
          const user = await userServices.findUser({ _id: jwt_payload._id });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userServices.findUser({ _id: id });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

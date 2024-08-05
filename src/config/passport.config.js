import passport from 'passport';
import locale from 'passport-local';
import passportjwt from 'passport-jwt';
import UserManager from '../dao/mongoDB/user.dao.js';
import CartManager from '../dao/mongoDB/cart.dao.js';
import { checkPass, hashPass } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import envsConfig from './envs.config.js';

const PassportLocale = locale.Strategy;
const PassportJWT = passportjwt.Strategy;
const userManager = new UserManager();
const cartManager = new CartManager();
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
          const userExist = await userManager.findUser({ email: username });
          if (userExist) return done(null, false);
          const newCart = await cartManager.createCart();
          const newUser = {
            first_name,
            last_name,
            age,
            email: username,
            password: hashPass(password),
            cart: newCart._id,
          };
          const userCreated = await userManager.createUser(newUser);
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
        const userExist = await userManager.findUser({ email: username });
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
          return done(null, jwt_payload);
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
      const user = await userManager.findUser({ _id: id });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

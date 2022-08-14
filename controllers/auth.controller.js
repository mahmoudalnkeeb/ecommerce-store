const { JWT_SECRET } = require('../configs/env');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const Token = require('../utils/jwt');
// create instances
const auths = new Auth(pool);
const tokens = new Token(jwt, JWT_SECRET);

// auth controller class
class AuthController {
  async login(req, res, next) {
    try {
      let { u, password } = req.body;
      if (!req.isEmail) {
        let isReal = await auths.checkPassByUsername();
        if (!isReal)
          return res.status(400).json({ msg: 'Wrong username or password' });

        let user = await auths.loginWithUsername(u);

        // here goes Jwt method
        let token = tokens.createToken(user);
        let oneDay = 1000 * 60 * 60 * 24;

        return res
          .status(201)
          .cookie('auth', token, { maxAge: oneDay })
          .json({ token });
      }
      let isReal = await auths.checkPassByEmail(u, password);
      if (!isReal)
        return res.status(400).json({ msg: 'Wrong email or password' });

      let user = await auths.loginWithEmail(u);

      // here goes Jwt method
      let token = tokens.createToken(user);
      let oneDay = 1000 * 60 * 60 * 24;

      return res
        .status(201)
        .cookie('auth', token, { maxAge: oneDay })
        .json({ token });
    } catch (error) {
      next(error);
    }
  }
  async signup(req, res, next) {
    try {
      let { firstname, lastname, username, email, password, avatar } =
        req.userData;
      let user = await auths.signup({
        firstname,
        lastname,
        username,
        email,
        password,
        avatar,
      });

      let token = tokens.createToken(user);
      let oneDay = 1000 * 60 * 60 * 24;
      return res
        .status(201)
        .cookie('auth', token, { maxAge: oneDay })
        .json({ token });
    } catch (error) {
      next(error);
    }
  }
  checkIsAuth(req, res, next) {
    try {
      let { token } = req.body;
      let checkToken = tokens.checkToken(token);
      if (!checkToken) return res.status(401).json({ isAuth: false });
      let user = tokens.decodeToken(token);
      res.status(200).json({ isAuth: true, user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

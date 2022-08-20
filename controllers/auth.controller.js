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
        let isReal = await auths.checkPassByUsername(u, password);
        if (!isReal)
          return res.status(400).json({ msg: 'Wrong username or password' });
        let user = await auths.loginWithUsername(u);

        // here goes Jwt method
        user.role = 'user';

        let token = tokens.createToken(user);
        let oneDay = 1000 * 60 * 60 * 24;
        let access_token = await auths.updateToken(token);
        return res
          .status(200)
          .cookie('auth', access_token, { maxAge: oneDay })
          .json({ access_token });
      }
      let isReal = await auths.checkPassByEmail(u, password);
      if (!isReal)
        return res.status(400).json({ msg: 'Wrong email or password' });

      let user = await auths.loginWithEmail(u);

      // here goes Jwt method
      user.role = 'user';

      let token = tokens.createToken(user);
      let oneDay = 1000 * 60 * 60 * 24;
      let access_token = await auths.updateToken(token);
      return res
        .status(200)
        .cookie('auth', access_token, { maxAge: oneDay })
        .json({ access_token });
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

      user.role = 'user';

      let token = tokens.createToken(user);
      let access_token = await auths.updateToken(token);
      let oneDay = 1000 * 60 * 60 * 24;
      return res
        .status(201)
        .cookie('auth', access_token, { maxAge: oneDay })
        .json({ msg: 'account created successfully', access_token });
    } catch (error) {
      next(error);
    }
  }
  async checkIsAuth(req, res, next) {
    try {
      let { token } = req.body;
      let realToken = tokens.checkToken(token);
      if (!realToken) return res.status(401).json({ isAuth: false });
      let user = tokens.decodeToken(token);
      let checkAccessToken = (await auths.getToken(user.user_id)) === token;
      if (checkAccessToken) return res.status(200).json({ isAuth: true, user });
      res.status(401).json({ isAuth: false });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

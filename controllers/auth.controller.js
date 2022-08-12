const bcrypt = require('bcrypt');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const Hash = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../utils/jwt');
const { saltRounds, jwtSecret } = require('../configs/env');
// create instances
const auths = new Auth(pool);
const hash = new Hash(bcrypt, saltRounds);
const tokens = new Token(jwt, jwtSecret);

// auth controller class
class AuthController {
  async login(req, res, next) {
    try {
      const uRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      let { u, password } = req.body;
      
      if (!uRegex.test(u)) {
        let hashedPass = await auths.getPassByUsername(u);
        console.log(hash.compareHash(password, hashedPass));
        if (!hash.compareHash(password, hashedPass))
          return res.status(400).json({ msg: 'Wrong username or password' });

        let user = await auths.loginWithUsername(u); // {firstname , lastname}

        // here goes Jwt method
        let token = tokens.createToken(user);
        return res.status(200).json({ token });
      }
      let hashedPass = await auths.getPassByEmail(u);
      if (!hash.compareHash(password, hashedPass))
        return res.status(400).json({ msg: 'Wrong email or password' });

      let user = await auths.loginWithEmail(u); // {firstname , lastname}

      // here goes Jwt method
      let token = tokens.createToken(user);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
  async signup(req, res, next) {
    try {
      let { firstname, lastname, username, email, password } = req.body,
        avatar = req.body.avatar || 'default:avatar';
      password = hash.createHash(password);
      let user = await auths.signup({
        firstname,
        lastname,
        username,
        email,
        password,
        avatar,
      });
      console.log(user);
      let token = tokens.createToken(user);
      return res.status(201).json({ token });
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

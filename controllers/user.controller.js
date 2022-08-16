const { JWT_SECRET } = require('../configs/env');
const jwt = require('jsonwebtoken');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const User = require('../models/user');
const Token = require('../utils/jwt');
const users = new User(pool);
const auths = new Auth(pool);
const tokens = new Token(jwt, JWT_SECRET);

module.exports = class UserController {
  async getById(req, res, next) {
    try {
      const id = req.params.id;
      let userData = await users.getById(id);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const { firstname, lastname, username, email, avatar, userId } = req.body;
      let newData = await users.updateUser(
        firstname,
        lastname,
        username,
        email,
        avatar,
        userId
      );
      res.status(200).json(newData);
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    try {
      const { newPass } = req.body;
      let data = await users.updatePassword(newPass, req.userid);
      let newToken = tokens.createToken(data);
      let token = await auths.updateToken(newToken);
      return res
        .status(200)
        .cookie('auth', access_token, { maxAge: oneDay })
        .json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
};

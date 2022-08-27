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
  // [profile] get user data by id for profile only user can get his data
  async getById(req, res, next) {
    try {
      let { id } = req.params;
      let userData = await users.getById(id);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  // [personal inforamtion] update user data with supplied new data and return data after update
  async updateUser(req, res, next) {
    try {
      let { firstname, lastname, username, email, avatar } = req.body;
      let userId = req.userId;
      let newData = await users.updateUser({
        firstname,
        lastname,
        username,
        email,
        avatar,
        userId,
      });
      res.status(200).json(newData);
    } catch (error) {
      next(error);
    }
  }

  // [security] update password
  async updatePassword(req, res, next) {
    try {
      let { newPass, oldPass } = req.body;
      if (!oldPass)
        return res.status(400).json({ msg: 'please enter your old password' });
      if (!newPass)
        return res.status(400).json({ msg: 'please enter your new password' });
      let userId = req.userId;
      let isRealPass = await auths.checkPassById(userId, oldPass);
      if (!isRealPass) return res.status(400).json({ msg: 'wrong password' });
      let data = await users.updatePassword(newPass, userId);
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

  // delete account
  async deleteUser(req, res, next) {
    try {
      let userId = req.userId;
      await users.deleteUser(userId);
      res.status(204).json({ msg: 'success' });
    } catch (error) {
      next(error);
    }
  }
};

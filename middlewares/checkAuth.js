const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const Token = require('../utils/jwt');
const tokens = new Token(jwt, JWT_SECRET);
const auths = new Auth(pool);

module.exports = async function isAuth(req, res, next) {
  let token = req.headers.authorization;
  let realToken = tokens.checkToken(token);
  if (!realToken) return res.status(401).json({ isAuth: false });
  let user = tokens.decodeToken(token);
  let checkAccessToken = (await auths.getToken(user.user_id)) === token;

  if (checkAccessToken) return next();

  res.status(401).json({ isAuth: false });
};

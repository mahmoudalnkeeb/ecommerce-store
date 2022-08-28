const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const Token = require('../utils/jwt');
const tokens = new Token(jwt, JWT_SECRET);
const auths = new Auth(pool);

async function isAuth(req, res, next) {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: 'unauthorized' });
  let realToken = tokens.checkToken(token);
  if (!realToken) return res.status(401).json({ msg: 'unauthorized' });
  let user = tokens.decodeToken(token);
  let checkAccessToken = (await auths.getToken(user.user_id)) === token;

  console.log(`userJwtDecode-Auth : ${user}`);

  if (checkAccessToken) {
    req.userId = user.user_id;

    console.log(`userId-Auth : ${req.userId}`);

    return next();
  }

  res.status(401).json({ msg: 'unauthorized' });
}
module.exports = isAuth;

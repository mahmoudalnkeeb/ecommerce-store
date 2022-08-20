const path = require('path');
const roles = require(path.join(__dirname, '../roles.json')).roles;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');
const pool = require('../configs/db');
const Auth = require('../models/auth');
const Token = require('../utils/jwt');
const tokens = new Token(jwt, JWT_SECRET);
const auths = new Auth(pool);

async function checkRole(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    console.log(roles['guest']);
    return next();
  }
  let realToken = tokens.checkToken(token);
  if (!realToken) {
    console.log('here');
    console.log(roles['guest']);
    return next();
  }
  let user = tokens.decodeToken(token);
  let checkAccessToken = (await auths.getToken(user.user_id)) === token;
  if (checkAccessToken) {
    console.log('here1');
    console.log(roles[user.role]);
    return next();
  }
  console.log('here2');
  console.log(roles['guest']);
  next();
}

module.exports = checkRole;

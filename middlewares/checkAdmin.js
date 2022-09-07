const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');
const pool = require('../configs/db');
const Token = require('../utils/jwt');
const Admin = require('../models/admin');
const tokens = new Token(jwt, JWT_SECRET);
const admins = new Admin(pool);

async function checkAdmin(req, res, next) {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: 'unauthorized' });
  if (!tokens.checkToken(token))
    return res.status(401).json({ msg: 'unauthorized' });

  let admin = tokens.decodeToken(token);
  let adminToken = await admins.getAccessToken(admin.adminId);
  let isAdmin = adminToken == token;

  if (isAdmin) {
    req.adminId = admin.adminId;
    return next();
  }

  return res.status(401).json({ msg: 'unauthorized' });
}

module.exports = checkAdmin;

const Token = require('../utils/jwt');
const tokens = new Token(jwt, jwtSecret);

module.exports = function isAuth(req, res, next) {
  let token = req.headers['authorization'].split('')[0];
  if (!tokens.checkToken) return (req.isAuth = false);
  req.isAuth = true;
  next();
};

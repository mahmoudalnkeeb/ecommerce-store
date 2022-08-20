const path = require('path');
const roles = require(path.join(__dirname, '../roles.json')).roles;

const userRole = roles.user;

function checkRole(req, res, next) {
  //   const role =
  next();
}

module.exports = checkRole;

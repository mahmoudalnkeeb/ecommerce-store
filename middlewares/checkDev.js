const { devSecret } = require('../configs/env');

module.exports = function checkDev(req, res, next) {
  let devCode = req.headers.dev;
  if (!devCode || devCode != devSecret)
    return res.status(403).send('not authorized');
  next();
};

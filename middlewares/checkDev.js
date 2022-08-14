const { DEV_SECRET } = require('../configs/env');

module.exports = function checkDev(req, res, next) {
  let devCode = req.headers.dev;
  if (!devCode || devCode != DEV_SECRET)
    return res.status(403).send('not authorized');
  next();
};

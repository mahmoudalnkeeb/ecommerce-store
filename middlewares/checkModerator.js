const { MODERATOR_SECRET } = require('../configs/env');

function isModerator(req, res, next) {
  const secret = req.headers.mod_secret;
  if (!secret || secret !== MODERATOR_SECRET) return res.status(403).send('Forbidden');
  next();
}

module.exports = isModerator;

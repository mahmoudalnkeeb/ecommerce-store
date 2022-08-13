const pool = require('../configs/db');
const Dev = require('../models/dev');
const devs = new Dev(pool);
module.exports = class DevController {
  async getUser(req, res, next) {
    try {
      const userID = req.params.id;
      const userData = await devs.getUserById(userID);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
};

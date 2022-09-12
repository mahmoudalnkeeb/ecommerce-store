const Asset = require('../models/assetsModel');

const assets = new Asset();

async function upload(req, res, next) {
  try {
    const file = req.file;
    let url = await assets.saveAsset(file);
    res.json({ url });
  } catch (error) {
    next(error);
  }
}

module.exports = { upload };

const shortId = require('shortid');

function generateId() {
  return shortId.generate();
}

module.exports = generateId;

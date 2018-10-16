const dirToObject = require('dir-to-object');
const { join } = require('path');

const config = {
  canAdd: data => data.print,
  dirPath: join(__dirname, '.')
};

const nodes = dirToObject(config);

module.exports = nodes;

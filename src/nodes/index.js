const dirToObject = require('dir-to-object');

const config = {
  canAdd: data => data.print,
  dirPath: __dirname
};

const nodes = dirToObject(config);

module.exports = nodes;

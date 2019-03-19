const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const IndexAccess = (node, path, options, print) =>
  concat([path.call(print, 'base'), '[', path.call(print, 'index'), ']']);

module.exports = IndexAccess;

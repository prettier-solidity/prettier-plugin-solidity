const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const IndexAccess = {
  print: ({ path, print }) =>
    concat([path.call(print, 'base'), '[', path.call(print, 'index'), ']'])
};

module.exports = IndexAccess;

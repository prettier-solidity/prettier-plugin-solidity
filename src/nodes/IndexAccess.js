const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const IndexAccess = {
  print: ({ path, print }) =>
    concat([path.call(print, 'base'), '[', path.call(print, 'index'), ']'])
};

module.exports = IndexAccess;

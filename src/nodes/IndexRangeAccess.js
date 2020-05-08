const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const IndexRangeAccess = {
  print: ({ path, print }) =>
    concat([
      path.call(print, 'base'),
      '[',
      path.call(print, 'indexStart'),
      ':',
      path.call(print, 'indexEnd'),
      ']'
    ])
};

module.exports = IndexRangeAccess;

const {
  doc: {
    builders: { group, indent, softline }
  }
} = require('prettier/standalone');

const IndexAccess = {
  print: ({ path, print }) => [
    path.call(print, 'base'),
    '[',
    group([indent([softline, path.call(print, 'index')]), softline]),
    ']'
  ]
};

module.exports = IndexAccess;

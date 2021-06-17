const {
  builders: { group, indent, softline }
} = require('prettier/doc');

const IndexAccess = {
  print: ({ path, print }) => [
    path.call(print, 'base'),
    '[',
    group([indent([softline, path.call(print, 'index')]), softline]),
    ']'
  ]
};

module.exports = IndexAccess;

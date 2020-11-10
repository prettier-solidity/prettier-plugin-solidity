const {
  doc: {
    builders: { concat, group, indent, softline }
  }
} = require('prettier/standalone');

const IndexAccess = {
  print: ({ path, print }) =>
    concat([
      path.call(print, 'base'),
      '[',
      group(
        concat([
          indent(concat([softline, path.call(print, 'index')])),
          softline
        ])
      ),
      ']'
    ])
};

module.exports = IndexAccess;

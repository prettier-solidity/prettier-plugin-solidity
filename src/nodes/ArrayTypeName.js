const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const ArrayTypeName = {
  print: ({ node, path, print }) =>
    concat([
      path.call(print, 'baseTypeName'),
      '[',
      node.length ? path.call(print, 'length') : '',
      ']'
    ])
};

module.exports = ArrayTypeName;

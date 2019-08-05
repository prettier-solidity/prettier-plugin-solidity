const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const ArrayTypeName = {
  print: ({ node, path, print }) => {
    let stateMutability = '';
    if (
      node.baseTypeName.name === 'address' &&
      node.baseTypeName.stateMutability
    ) {
      stateMutability = concat([' ', node.baseTypeName.stateMutability]);
    }
    return concat([
      path.call(print, 'baseTypeName'),
      stateMutability,
      '[',
      node.length ? path.call(print, 'length') : '',
      ']'
    ]);
  }
};

module.exports = ArrayTypeName;

const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const UsingForDeclaration = {
  print: ({ node, path, print }) =>
    concat([
      'using ',
      node.libraryName,
      ' for ',
      node.typeName ? path.call(print, 'typeName') : '*',
      ';'
    ])
};

module.exports = UsingForDeclaration;

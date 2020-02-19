const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const UsingForDeclaration = {
  print: ({ node, path, print }) =>
    node.typeName
      ? concat([
          'using ',
          node.libraryName,
          ' for ',
          path.call(print, 'typeName'),
          ';'
        ])
      : concat(['using ', node.libraryName, ' for *;'])
};

module.exports = UsingForDeclaration;

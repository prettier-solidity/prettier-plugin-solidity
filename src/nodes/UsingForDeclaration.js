const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const UsingForDeclaration = {
  print: ({ node, path, print }) => {
    if (node.typeName) {
      return concat([
        'using ',
        node.libraryName,
        ' for ',
        path.call(print, 'typeName'),
        ';'
      ]);
    }
    return concat(['using ', node.libraryName, ' for *;']);
  }
};

module.exports = UsingForDeclaration;

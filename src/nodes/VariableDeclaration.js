const {
  doc: {
    builders: { join }
  }
} = require('prettier/standalone');

const indexed = node => (node.isIndexed ? 'indexed' : '');

const visibility = node =>
  node.visibility !== 'default' ? node.visibility : '';

const constantKeyword = node => (node.isDeclaredConst ? 'constant' : '');

const storageLocation = node =>
  node.visibility !== 'default' ? node.storageLocation : '';

const VariableDeclaration = {
  print: ({ node, path, print }) => {
    if (!node.typeName) {
      return node.name;
    }

    return join(
      ' ',
      [
        path.call(print, 'typeName'),
        indexed(node),
        visibility(node),
        constantKeyword(node),
        storageLocation(node),
        node.name
      ].filter(element => element)
    );
  }
};

module.exports = VariableDeclaration;

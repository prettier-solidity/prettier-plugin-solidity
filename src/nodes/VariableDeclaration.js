const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const indexed = node => (node.isIndexed ? ' indexed' : '');

const visibility = node =>
  node.visibility && node.visibility !== 'default'
    ? concat([' ', node.visibility])
    : '';

const constantKeyword = node => (node.isDeclaredConst ? ' constant' : '');

const storageLocation = node =>
  node.storageLocation && node.visibility !== 'default'
    ? concat([' ', node.storageLocation])
    : '';

const name = node => (node.name ? concat([' ', node.name]) : '');

const VariableDeclaration = {
  print: ({ node, path, print }) =>
    node.typeName
      ? concat([
          path.call(print, 'typeName'),
          indexed(node),
          visibility(node),
          constantKeyword(node),
          storageLocation(node),
          name(node)
        ])
      : node.name
};

module.exports = VariableDeclaration;

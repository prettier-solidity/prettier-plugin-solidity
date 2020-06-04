const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const indexed = (node) => (node.isIndexed ? ' indexed' : '');

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? concat([line, node.visibility])
    : '';

const constantKeyword = (node) => (node.isDeclaredConst ? ' constant' : '');

const storageLocation = (node) =>
  node.storageLocation && node.visibility !== 'default'
    ? concat([line, node.storageLocation])
    : '';

const immutable = (node) => (node.isImmutable ? ' immutable' : '');

const override = (node, path, print) => {
  if (!node.override) return '';
  if (node.override.length === 0) return concat([line, 'override']);
  return concat([
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ]);
};

const name = (node) => (node.name ? concat([' ', node.name]) : '');

const VariableDeclaration = {
  print: ({ node, path, print }) =>
    node.typeName
      ? group(
          concat([
            path.call(print, 'typeName'),
            indent(
              concat([
                indexed(node),
                visibility(node),
                constantKeyword(node),
                storageLocation(node),
                immutable(node),
                override(node, path, print),
                name(node)
              ])
            )
          ])
        )
      : node.name
};

module.exports = VariableDeclaration;

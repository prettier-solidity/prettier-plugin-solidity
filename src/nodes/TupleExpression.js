const {
  doc: {
    builders: { concat, group }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const contents = (node, path, print) =>
  node.components &&
  node.components.length === 1 &&
  node.components[0].type === 'BinaryOperation'
    ? path.map(print, 'components')
    : [printList(path.map(print, node.components ? 'components' : 'elements'))];

const TupleExpression = {
  // @TODO: remove hack once solidity-parser-antlr is fixed
  print: ({ node, path, print }) =>
    group(
      concat([
        node.isArray ? '[' : '(',
        ...contents(node, path, print),
        node.isArray ? ']' : ')'
      ])
    )
};

module.exports = TupleExpression;

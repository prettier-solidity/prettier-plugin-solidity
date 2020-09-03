const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedList = require('./print-separated-list');

const returnTypes = (node, path, print) =>
  node.returnTypes.length > 0
    ? concat([
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ])
    : '';

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? concat([line, node.visibility])
    : '';

const stateMutability = (node) =>
  node.stateMutability && node.stateMutability !== 'default'
    ? concat([line, node.stateMutability])
    : '';

const FunctionTypeName = {
  print: ({ node, path, print }) =>
    concat([
      'function(',
      printSeparatedList(path.map(print, 'parameterTypes')),
      ')',
      indent(
        group(
          concat([
            visibility(node),
            stateMutability(node),
            returnTypes(node, path, print)
          ])
        )
      )
    ])
};

module.exports = FunctionTypeName;

const {
  doc: {
    builders: { concat, group, line }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');
const printSeparatedList = require('./print-separated-list');

const AssemblyFunctionDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'function ',
      node.name,
      '(',
      printSeparatedList(path.map(print, 'arguments')),
      ')',
      node.returnArguments.length === 0
        ? ' '
        : group(
            printSeparatedItem(
              concat([
                '->',
                printSeparatedList(path.map(print, 'returnArguments'), {
                  firstSeparator: line,
                  lastSeparator: ''
                })
              ]),
              { firstSeparator: line }
            )
          ),
      path.call(print, 'body')
    ])
};

module.exports = AssemblyFunctionDefinition;

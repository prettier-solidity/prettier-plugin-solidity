const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const AssemblyFunctionDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'function ',
      node.name,
      '(',
      printList(path.map(print, 'arguments')),
      ')',
      group(
        concat([
          indent(
            concat([
              line,
              '->',
              printList(path.map(print, 'returnArguments'), {
                firstSeparator: line,
                lastSeparator: ''
              })
            ])
          ),
          line
        ])
      ),
      path.call(print, 'body')
    ])
};

module.exports = AssemblyFunctionDefinition;

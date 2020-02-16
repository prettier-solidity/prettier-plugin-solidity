const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const AssemblyFunctionDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'function ',
      node.name,
      '(',
      group(
        concat([
          indent(
            concat([
              softline,
              join(concat([',', line]), path.map(print, 'arguments'))
            ])
          ),
          softline
        ])
      ),
      ')',
      ' -> ',
      join(', ', path.map(print, 'returnArguments')),
      ' ',
      path.call(print, 'body')
    ])
};

module.exports = AssemblyFunctionDefinition;

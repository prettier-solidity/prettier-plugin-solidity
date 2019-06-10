const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const AssemblyCall = {
  print: ({ node, path, print }) => {
    if (node.arguments.length === 0) {
      return node.functionName;
    }
    return concat([
      node.functionName,
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
      ')'
    ]);
  }
};

module.exports = AssemblyCall;

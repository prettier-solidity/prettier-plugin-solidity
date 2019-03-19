const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const AssemblyCall = (node, path, options, print) => {
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
};

module.exports = AssemblyCall;

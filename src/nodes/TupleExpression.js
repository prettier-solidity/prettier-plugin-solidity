const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const contents = (node, path, print) => {
  if (
    node.components &&
    node.components.length === 1 &&
    node.components[0].type === 'BinaryOperation'
  ) {
    return path.map(print, 'components');
  }
  return [
    indent(
      concat([
        softline,
        join(
          concat([',', line]),
          path.map(print, node.components ? 'components' : 'elements')
        )
      ])
    ),
    softline
  ];
};

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

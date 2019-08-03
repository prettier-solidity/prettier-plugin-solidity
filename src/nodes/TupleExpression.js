const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const TupleExpression = {
  // @TODO: remove hack once solidity-parser-antlr is fixed
  print: ({ node, path, print }) =>
    group(
      concat([
        node.isArray ? '[' : '(',
        indent(
          concat([
            softline,
            join(
              concat([',', line]),
              path.map(print, node.components ? 'components' : 'elements')
            )
          ])
        ),
        softline,
        node.isArray ? ']' : ')'
      ])
    )
};

module.exports = TupleExpression;

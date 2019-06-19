const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier');

const ReturnStatement = {
  print: ({ node, path, print }) =>
    concat([
      'return',
      node.expression.type === 'TupleExpression'
        ? concat([' ', path.call(print, 'expression'), ';'])
        : group(indent(concat([line, path.call(print, 'expression'), ';'])))
    ])
};

module.exports = ReturnStatement;

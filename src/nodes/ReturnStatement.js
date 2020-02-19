const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const expression = (node, path, print) => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression'
      ? concat([' ', path.call(print, 'expression')])
      : group(indent(concat([line, path.call(print, 'expression')])));
  }
  return '';
};

const ReturnStatement = {
  print: ({ node, path, print }) =>
    concat(['return', expression(node, path, print), ';'])
};

module.exports = ReturnStatement;

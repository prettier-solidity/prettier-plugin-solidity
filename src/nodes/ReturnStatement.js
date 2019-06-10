const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const expression = (node, path, print) => {
  if (node.expression) {
    if (node.expression.type === 'TupleExpression') {
      return concat([' ', path.call(print, 'expression')]);
    }
    return group(indent(concat([line, path.call(print, 'expression')])));
  }
  return '';
};

const ReturnStatement = {
  print: ({ node, path, print }) =>
    concat(['return', expression(node, path, print), ';'])
};

module.exports = ReturnStatement;

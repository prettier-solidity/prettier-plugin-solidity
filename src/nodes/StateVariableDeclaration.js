const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const initialValue = (node, path, print) => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return concat([' = ', path.call(print, 'initialValue')]);
  }

  return group(
    concat([' =', indent(concat([line, path.call(print, 'initialValue')]))])
  );
};

const StateVariableDeclaration = {
  print: ({ node, path, print }) =>
    concat([
      ...path.map(print, 'variables'),
      initialValue(node, path, print),
      ';'
    ])
};

module.exports = StateVariableDeclaration;

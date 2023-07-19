import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const expression = (node, path, print) => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression'
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement = {
  print: ({ node, path, print }) => [
    'return',
    expression(node, path, print),
    ';'
  ]
};

import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const expression = (node, path, print, options) => {
  if (node.expression) {
    return node.expression.type === 'TupleExpression' ||
      (options.experimentalTernaries && node.expression.type === 'Conditional')
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement = {
  print: ({ node, path, print, options }) => [
    'return',
    expression(node, path, print, options),
    ';'
  ]
};

import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const expression = (node, path, print, options) => {
  if (node.expression) {
    return node.expression.variant.kind === 'TupleExpression' ||
      (options.experimentalTernaries &&
        node.expression.type === 'ConditionalExpression')
      ? [' ', path.call(print, 'expression')]
      : group(indent([line, path.call(print, 'expression')]));
  }
  return '';
};

export const ReturnStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    returnKeyword: ast.returnKeyword.text,
    expression: ast.expression
      ? parse(ast.expression, options, parse, offsets)
      : undefined,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print, options }) => [
    node.returnKeyword,
    expression(node, path, print, options),
    node.semicolon
  ]
};

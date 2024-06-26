export const VariableDeclarationValue = {
  parse: ({ offsets, ast, options, parse }) => ({
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    ` ${node.equal} `,
    path.call(print, 'expression')
  ]
};

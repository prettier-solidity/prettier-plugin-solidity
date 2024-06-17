export const VariableDeclarationValue = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    ` ${node.equal} `,
    path.call(print, 'expression')
  ]
};

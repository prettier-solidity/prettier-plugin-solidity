export const IndexAccessEnd = {
  parse: ({ ast, options, parse }) => ({
    colon: ast.colon.text,
    end: ast.end ? parse(ast.end, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    node.colon,
    node.end ? path.call(print, 'end') : ''
  ]
};

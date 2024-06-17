export const StateVariableAttributes = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ node, path, print }) =>
    node.items.length ? path.map(print, 'items').map((item) => [' ', item]) : ''
};

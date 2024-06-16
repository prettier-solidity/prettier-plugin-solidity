export const UsingDeconstructionSymbol = {
  parse: ({ ast, options, parse }) => ({
    name: parse(ast.name, options, parse),
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'name'),
    node.alias ? path.call(print, 'alias') : ''
  ]
};

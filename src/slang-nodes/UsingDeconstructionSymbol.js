export const UsingDeconstructionSymbol = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: parse(ast.name, options, parse, offsets),
    alias: ast.alias ? parse(ast.alias, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'name'),
    node.alias ? path.call(print, 'alias') : ''
  ]
};

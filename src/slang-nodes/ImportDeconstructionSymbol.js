export const ImportDeconstructionSymbol = {
  parse: ({ ast, options, parse }) => ({
    name: ast.name.text,
    alias: ast.alias ? parse(ast.alias, options, parse) : undefined
  }),
  print: ({ node, path, print }) => [
    node.name,
    node.alias ? path.call(print, 'alias') : ''
  ]
};

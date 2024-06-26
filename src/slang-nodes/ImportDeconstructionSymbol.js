export const ImportDeconstructionSymbol = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: ast.name.text,
    alias: ast.alias ? parse(ast.alias, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    node.name,
    node.alias ? path.call(print, 'alias') : ''
  ]
};

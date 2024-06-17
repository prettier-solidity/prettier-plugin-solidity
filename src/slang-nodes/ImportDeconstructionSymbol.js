export const ImportDeconstructionSymbol = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    name: ast.name.text,
    alias: ast.alias ? parse(ast.alias, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) => [
    node.name,
    node.alias ? path.call(print, 'alias') : ''
  ]
};

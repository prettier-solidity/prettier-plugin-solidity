export const TupleDeconstructionElement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    member: ast.member ? parse(ast.member, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) =>
    node.member ? path.call(print, 'member') : ''
};

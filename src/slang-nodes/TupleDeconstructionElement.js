export const TupleDeconstructionElement = {
  parse: ({ offsets, ast, options, parse }) => ({
    member: ast.member ? parse(ast.member, options, parse, offsets) : undefined
  }),
  print: ({ node, path, print }) =>
    node.member ? path.call(print, 'member') : ''
};

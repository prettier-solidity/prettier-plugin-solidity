export const TupleDeconstructionElement = {
  parse: ({ ast, options, parse }) => ({
    member: ast.member ? parse(ast.member, options, parse) : undefined
  }),
  print: ({ node, path, print }) =>
    node.member ? path.call(print, 'member') : ''
};

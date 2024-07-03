import { doc } from 'prettier';

const { group } = doc.builders;

export const ReturnsDeclaration = {
  parse: ({ offsets, ast, options, parse }) => ({
    returnsKeyword: ast.returnsKeyword.text,
    variables: parse(ast.variables, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.returnsKeyword} `,
    group(path.call(print, 'variables'))
  ]
};

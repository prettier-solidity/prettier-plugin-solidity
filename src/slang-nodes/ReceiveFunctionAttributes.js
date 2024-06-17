import { doc } from 'prettier';

const { line } = doc.builders;

export const ReceiveFunctionAttributes = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) =>
    path.map(print, 'items').map((item) => [line, item])
};

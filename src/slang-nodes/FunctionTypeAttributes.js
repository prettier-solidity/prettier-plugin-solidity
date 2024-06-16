import { doc } from 'prettier';

const { line } = doc.builders;

export const FunctionTypeAttributes = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) =>
    path.map(print, 'items').map((item) => [line, item])
};

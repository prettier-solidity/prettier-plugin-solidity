import { doc } from 'prettier';

const { line } = doc.builders;

export const ModifierAttributes = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) =>
    path.map(print, 'items').map((item) => [line, item])
};

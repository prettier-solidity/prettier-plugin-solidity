import { doc } from 'prettier';

const { line } = doc.builders;

export const ModifierAttributes = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) =>
    path.map(print, 'items').map((item) => [line, item])
};

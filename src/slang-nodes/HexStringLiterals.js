import { doc } from 'prettier';

const { join, hardline } = doc.builders;

export const HexStringLiterals = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

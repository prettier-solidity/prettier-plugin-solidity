import { doc } from 'prettier';

const { join, line } = doc.builders;

export const HexStringLiterals = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => join(line, path.map(print, 'items'))
};

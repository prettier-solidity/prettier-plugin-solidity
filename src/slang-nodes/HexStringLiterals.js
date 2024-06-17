import { doc } from 'prettier';

const { join, hardline } = doc.builders;

export const HexStringLiterals = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

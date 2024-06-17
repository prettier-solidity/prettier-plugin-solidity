import { doc } from 'prettier';

const { join } = doc.builders;

export const CatchClauses = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) => join(' ', path.map(print, 'items'))
};

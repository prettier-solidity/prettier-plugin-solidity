import { doc } from 'prettier';

const { join, hardline } = doc.builders;

export const UnicodeStringLiterals = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

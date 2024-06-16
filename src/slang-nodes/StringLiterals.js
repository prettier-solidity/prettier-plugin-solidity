import { doc } from 'prettier';

const { join, hardline } = doc.builders;

export const StringLiterals = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

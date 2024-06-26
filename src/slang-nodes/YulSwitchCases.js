import { doc } from 'prettier';

const { hardline, join } = doc.builders;

export const YulSwitchCases = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

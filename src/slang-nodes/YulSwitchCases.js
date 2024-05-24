import { doc } from 'prettier';

const { hardline, join } = doc.builders;

export const YulSwitchCases = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => join(hardline, path.map(print, 'items'))
};

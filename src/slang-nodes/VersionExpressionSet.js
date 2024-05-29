import { doc } from 'prettier';

const { join } = doc.builders;

export const VersionExpressionSet = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => join(' ', path.map(print, 'items'))
};

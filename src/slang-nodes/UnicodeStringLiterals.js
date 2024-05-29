import { doc } from 'prettier';

const { group, join, line } = doc.builders;

export const UnicodeStringLiterals = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print }) => group(join(line, path.map(print, 'items')))
};

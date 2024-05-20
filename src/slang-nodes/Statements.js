import { printPreservingEmptyLines } from '../common/printer-helpers.js';

export const Statements = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, options, print }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};

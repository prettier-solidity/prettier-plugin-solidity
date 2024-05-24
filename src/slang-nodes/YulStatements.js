import { printPreservingEmptyLines } from '../common/printer-helpers.js';

export const YulStatements = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ path, print, options }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};

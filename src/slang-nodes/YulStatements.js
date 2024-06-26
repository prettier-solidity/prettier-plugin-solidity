import { printPreservingEmptyLines } from '../common/slang-helpers.js';

export const YulStatements = {
  parse: ({ offsets, ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print, options }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};

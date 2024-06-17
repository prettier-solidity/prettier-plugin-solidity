import { printPreservingEmptyLines } from '../common/slang-helpers.js';

export const YulStatements = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    items: ast.items.map((item) => parse(item, options, parse, offsets))
  }),
  print: ({ path, print, options }) =>
    printPreservingEmptyLines(path, 'items', options, print)
};

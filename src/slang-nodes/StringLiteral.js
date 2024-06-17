import { printString } from '../common/util.js';

export const StringLiteral = {
  parse: ({ node, offsets, ast, options }) => ({
    ...node,
    variant: printString(ast.variant.text.slice(1, -1), options)
  }),
  print: ({ node }) => node.variant
};

import { printString } from '../common/util.js';

export const UnicodeStringLiteral = {
  parse: ({ node, ast, options }) => ({
    ...node,
    variant: `unicode${printString(ast.variant.text.slice(8, -1), options)}`
  }),
  print: ({ node }) => node.variant
};

import { printString } from '../common/util.js';

export const UnicodeStringLiteral = {
  parse: ({ ast, options }) => ({
    variant: `unicode${printString(ast.variant.text.slice(8, -1), options)}`
  }),
  print: ({ node }) => node.variant
};

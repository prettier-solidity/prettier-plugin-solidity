import { printString } from '../common/util.js';

export const StringLiteral = {
  parse: ({ ast, options }) => ({
    variant: printString(ast.variant.text.slice(1, -1), options)
  }),
  print: ({ node }) => node.variant
};

import { printString } from '../common/util.js';

export const HexStringLiteral = {
  parse: ({ ast, options }) => ({
    variant: `hex${printString(ast.variant.text.slice(4, -1), options)}`
  }),
  print: ({ node }) => node.variant
};

import { printString } from '../common/util.js';

export const HexStringLiteral = {
  parse: ({ ast, options }) => ({
    kind: ast.cst.kind,
    variant: `hex${printString(ast.variant.text.slice(4, -1), options)}`
  }),
  print: ({ node }) => node.variant
};

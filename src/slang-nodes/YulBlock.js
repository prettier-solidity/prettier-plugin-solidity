import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const YulBlock = {
  parse: ({ ast, options, parse }) => ({
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, print }) => [
    node.openBrace,
    printSeparatedItem(print.call(print, 'statements'), {
      firstSeparator: hardline,
      grouped: false
    }),
    node.closeBrace
  ]
};

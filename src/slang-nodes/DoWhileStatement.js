import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const printBody = (node, path, print) =>
  node.body.variant.kind === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

export const DoWhileStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    doKeyword: ast.doKeyword.text,
    body: parse(ast.body, options, parse),
    whileKeyword: ast.whileKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse),
    closeParen: ast.closeParen.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.doKeyword,
    printBody(node, path, print),
    `${node.whileKeyword} ${node.openParen}`,
    printSeparatedItem(path.call(print, 'condition')),
    `${node.closeParen}${node.semicolon}`
  ]
};

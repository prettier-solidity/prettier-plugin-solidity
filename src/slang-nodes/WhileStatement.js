import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const body = (node, path, print) =>
  node.body.variant.kind === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const WhileStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    whileKeyword: ast.whileKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse, offsets),
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.whileKeyword} ${node.openParen}`,
    printSeparatedItem(path.call(print, 'condition')),
    node.closeParen,
    body(node, path, print)
  ]
};

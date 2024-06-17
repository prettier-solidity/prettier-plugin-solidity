import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const TryStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    tryKeyword: ast.tryKeyword.text,
    expression: parse(ast.expression, options, parse, offsets),
    returns: ast.returns
      ? parse(ast.returns, options, parse, offsets)
      : undefined,
    body: parse(ast.body, options, parse, offsets),
    catchClauses: parse(ast.catchClauses, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.tryKeyword,
    printSeparatedItem(path.call(print, 'expression'), {
      firstSeparator: line
    }),
    node.returns ? path.call(print, 'returns') : '',
    path.call(print, 'body'),
    ' ',
    path.call(print, 'catchClauses')
  ]
};

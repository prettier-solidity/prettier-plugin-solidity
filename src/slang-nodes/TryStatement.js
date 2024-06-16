import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const TryStatement = {
  parse: ({ ast, options, parse }) => ({
    tryKeyword: ast.tryKeyword.text,
    expression: parse(ast.expression, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse),
    catchClauses: parse(ast.catchClauses, options, parse)
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

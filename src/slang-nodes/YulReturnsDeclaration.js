import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const YulReturnsDeclaration = {
  parse: ({ offsets, ast, options, parse }) => ({
    minusGreaterThan: ast.minusGreaterThan.text,
    variables: parse(ast.variables, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printSeparatedItem([node.minusGreaterThan, path.call(print, 'variables')], {
      firstSeparator: line
    })
};

import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const YulReturnsDeclaration = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    minusGreaterThan: ast.minusGreaterThan.text,
    variables: parse(ast.variables, options, parse)
  }),
  print: ({ node, path, print }) =>
    printSeparatedItem([node.minusGreaterThan, path.call(print, 'variables')], {
      firstSeparator: line
    })
};

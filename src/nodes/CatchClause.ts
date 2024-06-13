import { printSeparatedList } from '../common/printer-helpers.js';
import type { CatchClause as ICatchClause } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const parameters = (
  node: ICatchClause,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

export const CatchClause: NodePrinter<ICatchClause> = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node, path, print),
    path.call(print, 'body')
  ]
};

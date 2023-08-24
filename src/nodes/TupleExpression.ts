import { printSeparatedList } from '../common/printer-helpers.js';
import type { TupleExpression as ITupleExpression } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const contents = (
  node: ITupleExpression,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.components.length === 1 && node.components[0]!.type === 'BinaryOperation'
    ? path.map(print, 'components')
    : printSeparatedList(path.map(print, 'components'));

export const TupleExpression: NodePrinter<ITupleExpression> = {
  print: ({ node, path, print }) => [
    node.isArray ? '[' : '(',
    contents(node, path, print),
    node.isArray ? ']' : ')'
  ]
};

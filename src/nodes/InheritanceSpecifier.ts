import { printSeparatedList } from '../common/printer-helpers.js';
import type { InheritanceSpecifier as IInheritanceSpecifier } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const printArguments = (
  node: IInheritanceSpecifier,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.arguments.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

export const InheritanceSpecifier: NodePrinter<IInheritanceSpecifier> = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseName'),
    printArguments(node, path, print)
  ]
};

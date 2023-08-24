import { printSeparatedList } from '../common/printer-helpers.js';
import type { CustomErrorDefinition as ICustomErrorDefinition } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const parameters = (
  node: ICustomErrorDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const CustomErrorDefinition: NodePrinter<ICustomErrorDefinition> = {
  print: ({ node, path, print }) => [
    `error ${node.name}(`,
    parameters(node, path, print),
    ');'
  ]
};

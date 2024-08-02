import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type { FunctionTypeName as IFunctionTypeName } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, line } = doc.builders;

const returnTypes = (
  node: IFunctionTypeName,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

const visibility = (node: IFunctionTypeName): Doc =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const stateMutability = (node: IFunctionTypeName): Doc =>
  node.stateMutability && node.stateMutability !== 'default'
    ? [line, node.stateMutability]
    : '';

export const FunctionTypeName: NodePrinter<IFunctionTypeName> = {
  print: ({ node, path, print }) => [
    'function(',
    printSeparatedList(path.map(print, 'parameterTypes')),
    ')',
    group(
      indent([
        visibility(node),
        stateMutability(node),
        returnTypes(node, path, print)
      ])
    )
  ]
};

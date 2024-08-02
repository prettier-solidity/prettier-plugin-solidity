import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import type { ContractDefinition as IContractDefinition } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { NodePrinter } from './types';

const { group, line, hardline } = doc.builders;

const inheritance = (
  node: IContractDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.baseContracts.length > 0
    ? [
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line
        })
      ]
    : line;

const body = (
  node: IContractDefinition,
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc => {
  const comments = printComments(node, path, options);
  return node.subNodes.length > 0 || comments.length
    ? printSeparatedItem(
        [printPreservingEmptyLines(path, 'subNodes', options, print), comments],
        { firstSeparator: hardline, grouped: false }
      )
    : '';
};

export const ContractDefinition: NodePrinter<IContractDefinition> = {
  print: ({ node, options, path, print }) => [
    group([
      `${node.kind}${node.kind === 'abstract' ? ' contract ' : ' '}${node.name}`,
      inheritance(node, path, print),
      '{'
    ]),
    body(node, path, options, print),
    '}'
  ]
};
